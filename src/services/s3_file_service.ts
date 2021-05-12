import AWS from 'aws-sdk';
import { notifyIC } from './notify_service_ICs';
import { notifyStudent_Stage_1 } from './notify_service_student';

require('dotenv/config');

var Submission_Schema = require('../model /submissionschema');

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
        Key: `${req.body['Student_Registration_Number']}-${req.body['Course_Code']}/${item.originalname}`, // Folder name has to be the student id with course code
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
      var MongoSubmission = new Submission_Schema({
        Student_Name: req.body.Student_Name,
        Student_Registration_Number: req.body.Student_Registration_Number,
        Batch: req.body.Batch,
        Course_Code: req.body.Course_Code,
        Department: req.body.Department,
        Description: req.body.Description,
        Event_Name: req.body.Event_Name,
        Project_Name: req.body.Project_Name,
        Team_Name: req.body.Team_Name,
        Student_Email: req.body.Student_Email,
        Tracker: 1,
        S3_Links: Object.values(S3_Links_Array),
      });
      try {
        MongoSubmission.save().then(async () => {
          console.log('Sucessfully Uploaded');
          console.log('Mails Sent to following people');
          await notifyStudent_Stage_1(MongoSubmission);
          await notifyIC(MongoSubmission);
        });
      } catch (err) {
        console.log(err);
      }

      S3_Links_Array = [];

      return true;
    })

    .catch((e) => console.log(e));
}
