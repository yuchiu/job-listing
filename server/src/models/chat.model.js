import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  message: {
    type: String,
    maxlength: 1280
  }
});

const chatModel = mongoose.model("Chat", ChatSchema);

export default chatModel;
