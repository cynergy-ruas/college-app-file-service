import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Registration_Number: {
    type: String,
    required: true,
  },
  Faculty: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: any) {
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email',
    },
    required: [true, 'Email required'],
  },
  Semester: {
    type: Number,
  },
  Password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
