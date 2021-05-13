import mongoose from 'mongoose';

const { Schema } = mongoose;

const Submission_Schema = new Schema({
  Student_Name: {
    type: String,
    required: true,
  },
  Student_Registration_Number: {
    type: String,
    required: true,
  },
  Batch: {
    type: String,
    required: true,
  },
  Course_Code: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Event_Name: {
    type: String,
    required: true,
  },
  Project_Name: {
    type: String,
    required: true,
  },
  Team_Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Student_Email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: any) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email',
    },
    required: [true, 'Email required'],
  },
  Student_Grade: {
    type: String,
  },
  Evaulators_Data: [
    {
      Faculty_Registration_Number_1: {
        type: String,
      },
      Faculty_Email_1: {
        type: String,
      },
      Faculty_Registration_Number_2: {
        type: String,
      },
      Faculty_Email_2: {
        type: String,
      },
    },
  ],

  Tracker: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  TimeStamp: {
    type: Date,
    default: new Date(),
  },
  S3_Links: [
    {
      type: String,
    },
  ],
});

export default mongoose.model('Submission_Schema', Submission_Schema);
