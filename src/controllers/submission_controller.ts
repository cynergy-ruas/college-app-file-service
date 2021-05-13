var Submission_Schema = require('../model /submissionschema');

// Get all for the admin part
export async function getalladmin(req: any, res: any) {
  try {
    Submission_Schema.find().then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for the student to get it whatever she or he as submitted and also can be used by admin and faculty
export async function getbyregno(req: any, res: any) {
  try {
    await Submission_Schema.find({
      Student_Registration_Number: req.query.Student_Registration_Number,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbydept(req: any, res: any) {
  try {
    await Submission_Schema.find({
      Department: req.query.Department,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out

export async function getbybatch(req: any, res: any) {
  try {
    await Submission_Schema.find({
      Batch: req.query.Batch,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}
// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbycourse(req: any, res: any) {
  try {
    await Submission_Schema.find({
      Course_Code: req.query.Course_Code,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}
