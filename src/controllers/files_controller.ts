import File_Schema from '../model/fileschema';

// This Request is for the student to get it whatever she or he that has been submitted by the CR of that section
export async function getbysection(req: any, res: any) {
  try {
    await File_Schema.find({
      Section: req.query.Section,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbyyear(req: any, res: any) {
  try {
    await File_Schema.find({
      Year: req.query.Year,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

// This Request is for all the IC Memebers and Admin if he wants to filter out

export async function getbycoursename(req: any, res: any) {
  try {
    await File_Schema.find({
      Course_Name: req.query.Course_Name,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}
// This Request is for all the IC Memebers and Admin if he wants to filter out
export async function getbycoursecode(req: any, res: any) {
  try {
    await File_Schema.find({
      Course_Code: req.query.Course_Code,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}
export async function getbysem(req: any, res: any) {
  try {
    await File_Schema.find({
      Semester: req.query.Semester,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

export async function getbyName(req: any, res: any) {
  try {
    await File_Schema.find({
      File_Name: req.query.File_Name,
    }).then((result: any) => {
      return res.status(200).send(result);
    });
  } catch (err) {
    res.json({ message: err });
  }
}

export async function updatebyName(req: any, res: any) {
  try {
    await File_Schema.updateMany(
      { File_Name: req.query.File_Name },
      {
        $set: {
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
        },
      },
      { multi: true }
    );
  } catch (err) {
    res.json({ message: err });
  }
}

export async function deletebyName(req: any, res: any) {
  try {
    await File_Schema.remove({ File_Name: req.query.File_Name });
  } catch (err) {
    res.json({ message: err });
  }
}
