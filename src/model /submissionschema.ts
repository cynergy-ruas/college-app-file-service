import mongoose from 'mongoose';

const { Schema } = mongoose;

const File_Schema = new Schema({
  File_Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Course_Name: {
    type: String,
    required: true,
  },
  Course_Code: {
    type: String,
    required: true,
  },

  Section: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },

  Uploaded_By: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
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

export default mongoose.model('File_Schema', File_Schema);
