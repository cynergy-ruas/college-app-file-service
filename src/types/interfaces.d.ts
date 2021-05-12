import mongoose from 'mongoose';
export interface Submission {
  id?: String;
  Student_Name: String;
  Student_Registration_Number: String;
  Course_Code: String;
  Department: String;
  Event_Name: String;
  Project_Name: String;
  Team_Name: String;
  Description: String;
  Student_Email: String;
  Tracker: Number;
  TimeStamp: Date;
  S3_Links: Array<string>;
  file: File;
}
