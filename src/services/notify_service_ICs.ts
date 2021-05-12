import { Submission } from '../types/interfaces';
var Faculty_Schema = require('../model /facultyschema');
var nodemailer = require('nodemailer');

export async function notifyIC(data: Submission) {
  var transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var IC_Members: String[] = [];
  var Admins: String[] = [];
  try {
    var Find_Member = await Faculty_Schema.find({
      Role: 'IC Member',
      Department: data.Department,
    });
    for (var i = 0; i < Find_Member.length; i++) {
      IC_Members.push(Find_Member[i].Email);
    }
  } catch (err) {
    console.log(err);
  }

  if (typeof IC_Members !== 'undefined' && IC_Members.length === 0) {
    try {
      var Find_Member = await Faculty_Schema.find({
        Role: 'Admin',
      });
      for (var i = 0; i < Find_Member.length; i++) {
        Admins.push(Find_Member[i].Email);
      }
    } catch (error) {
      console.log(error);
    }
  }
  var document = '';
  for (i = 0; i < data.S3_Links.length; i++)
    document = document + (i + 1 + ': ' + data.S3_Links[i] + '\n');

  var mailOptions = {
    from: process.env.EMAIL,
    to: IC_Members || Admins,
    subject: 'Submisson Review',
    text: `Dear Sir/Madam,
    \nA Submission has been made through the portal. The Details of the Student are as follows,
    \n Name : ${data.Student_Name}.
    \n Registration Number : ${data.Student_Registration_Number}.
    \n Department : ${data.Department}.
    \n Course Code : ${data.Course_Code}.
    \n Event Name : ${data.Event_Name}.
    \n Project Name : ${data.Project_Name}.
    \n Team Name : ${data.Team_Name}.
    \n Description : ${data.Description}.
    \n All the links for this submission are given below
    \n ${document}`,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('IC or Admin Email sent: ' + info.response);
    }
  });
  IC_Members = [];
  Admins = [];
}
