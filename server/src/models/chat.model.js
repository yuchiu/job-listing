import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  chatid: { type: String, require: true },
  from: { type: String, require: true },
  to: { type: String, require: true },
  read: { type: Boolean, default: false },
  content: {
    type: String,
    require: true,
    default: "",
    maxlength: 255
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatModel = mongoose.model("Chat", ChatSchema);

export default chatModel;
