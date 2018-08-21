import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: 127,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 127,
    default: ""
  },
  username: {
    type: String,
    trim: true,
    maxlength: 127,
    require: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 127,
    require: true
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 127,
    require: true
  },
  role: {
    type: String,
    minlength: 4,
    maxlength: 127,
    require: true
  },
  title: {
    type: String,
    maxlength: 64,
    default: ""
  },
  desc: {
    type: String,
    maxlength: 127,
    default: ""
  },
  salary: {
    type: String,
    maxlength: 127,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
