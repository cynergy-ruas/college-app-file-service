import AWS from 'aws-sdk';
import { notifyIC } from './notify_service_ICs';
import { notifyStudent_Stage_1 } from './notify_service_student';
import File_Schema from '../model/fileschema';
require('dotenv/config');

// This Contains all the code for the S3 Service Bucket
// TODO Write the Comments later. (After the Exams)
export async function s3_service_function(req: any, res: any) {
  var S3_Links_Array: String[] = [];

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });
  const file = req.files;
  const files = Object.values(file);
  Promise.all(
    files.map(async (item: any) => {
      var uploadParams: AWS.S3.PutObjectRequest = {
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: `${req.body['Department']}/${req.body['Year']}/${req.body['Section']}/${req.body['Course_Code']}-${req.body['Course_Name']}/${item.originalname}`,
        Body: item.buffer,
      };

      let temp = s3.upload(uploadParams).promise();
      return temp
        .then((data) => {
          S3_Links_Array.push(data['Location']);
        })
        .catch((e) => console.log(e));
    })
  )
    .then(() => {
      var MongoSubmission = new File_Schema({
        File_Name: req.body.File_Name,
        Description: req.body.Description,
        Course_Name: req.body.Course_Name,
        Course_Code: req.body.Course_Code,
        Section: req.body.Section,
        Year: req.body.Year,
        Department: req.body.Department,
        Uploaded_By: req.body.Uploaded_By,
        Type: req.body.Type,
        Semester: req.body.Semester,
        S3_Links: Object.values(S3_Links_Array),
      });
      try {
        MongoSubmission.save().then(async () => {
          // console.log('Sucessfully Uploaded');
          // console.log('Mails Sent to following people');
          // // Small thing
          // await notifyStudent_Stage_1(MongoSubmission);
          // await notifyIC(MongoSubmission);
          res.status(200).send('Successfully Uploaded');
        });
      } catch (err) {
        console.log(err);
      }

      S3_Links_Array = [];

      return true;
    })

    .catch((e) => console.log(e));
}
