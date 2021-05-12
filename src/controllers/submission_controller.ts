var Submission_Schema = require('../model /submissionschema');

// Get all for the admin part
export async function getalladmin(res: any, _: any) {
  try {
    const Submissions = await Submission_Schema.find();
    return res.json(Submissions);
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for the student to get it whatever she or he as submitted and also can be used by admin and faculty
export async function getbyregno(res: any, req: any) {
  try {
    const Submissions = await Submission_Schema.find({
      Registration_Number: req.query.Registration_Number,
    });
    res.json(Submissions);
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbydept(res: any, req: any) {
  try {
    const Submissions = await Submission_Schema.find({
      Department: req.query.Department,
    });
    res.json(Submissions);
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out

export async function getbybatch(res: any, req: any) {
  try {
    const Submissions = await Submission_Schema.find({
      Batch: req.query.Batch,
    });
    res.json(Submissions);
  } catch (err) {
    res.json({ message: err });
  }
}
// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbycourse(res: any, req: any) {
  try {
    const Submissions = await Submission_Schema.find({
      Course_Code: req.query.Course_Code,
    });
    res.json(Submissions);
  } catch (err) {
    res.json({ message: err });
  }
}
