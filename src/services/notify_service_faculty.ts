import { Submission } from '../types/interfaces';
var nodemailer = require('nodemailer');

export async function notifyFaculty(data: Submission, req: any) {
  var transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var i: any;
  var document = '';
  for (i = 0; i < data.S3_Links.length; i++)
    document = document + (i + 1 + ': ' + data.S3_Links[i] + '\n');

  var mailOptions = {
    from: process.env.EMAIL,
    to: `${req.body.Faculty_Email_1},${req.body.Faculty_Email_1}`,
    subject: 'Submisson Successful',
    text: `Hey ${data.Student_Name},
    \n Your Submission has been made through the portal. The Details of your submission are,
    \n Name : ${data.Student_Name}.
    \n Registration Number : ${data.Student_Registration_Number}.
    \n Department : ${data.Department}.
    \n Course Code : ${data.Course_Code}.
    \n Event Name : ${data.Event_Name}.
    \n Project Name : ${data.Project_Name}.
    \n Team Name : ${data.Team_Name}.
    \n Description : ${data.Description}.
    \n All the links for this submission are given below
    \n ${document}
    \n Once the evaluator will be assigned you can look it up in the portal`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Faculty Email sent: ' + info.response);
    }
  });
}
