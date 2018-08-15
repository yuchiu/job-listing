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
    default: ""
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 127,
    default: ""
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 127,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
