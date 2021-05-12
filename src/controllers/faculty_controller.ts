var Submission_Schema = require('../model /submissionschema');

import { notifyFaculty } from '../services/notify_service_faculty';
import {
  notifyStudent_Stage_2,
  notifyStudent_Stage_3,
} from '../services/notify_service_student';

// Get the Student Details and then Assign it then send mail
export async function assign_submission(req: any, res: any) {
  try {
    await Submission_Schema.updateMany(
      { _id: req.body._id },
      {
        $set: {
          Tracker: 2,
          Evaulators_Data: {
            Faculty_Registration_Number_1:
              req.body.Faculty_Registration_Number_1,
            Faculty_Email_1: req.body.Faculty_Email_1,
            Faculty_Registration_Number_2:
              req.body.Faculty_Registration_Number_2,
            Faculty_Email_2: req.body.Faculty_Email_2,
          },
        },
      },
      { multi: true }
    )
      .then(async (data: any) => {
        res.json('Assigned Successfully');

        data = await Submission_Schema.findOne({
          _id: req.body._id,
        });
        console.log('Mails Sent to following people');
        await notifyStudent_Stage_2(data);
        await notifyFaculty(data, req);
      })
      .catch((err: Error) => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
}

// Grade the Student and then send mail to Student.
export async function grade_submission(req: any, res: any) {
  try {
    await Submission_Schema.updateMany(
      { _id: req.body._id },
      {
        $set: {
          Tracker: 3,
          Student_Grade: req.body.Student_Grade,
        },
      },
      { multi: true }
    )
      .then(async (dataobj: any) => {
        dataobj = await Submission_Schema.findOne({
          _id: req.body._id,
        });

        res.json('Graded');

        await notifyStudent_Stage_3(dataobj);
        console.log('Mails Sent to following people');
      })
      .catch((err: Error) => {
        res.send(err);
      });
  } catch (err) {
    res.send(err);
  }
}
