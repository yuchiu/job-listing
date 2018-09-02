import { messageModel, userModel } from "../models";

const messageController = {
  getMsgList: async (req, res) => {
    try {
      // req.user is retreived from auth.policy
      const reqUserId = req.user.id;
      const msgList = await messageModel.find({
        $or: [{ from: reqUserId }, { to: reqUserId }]
      });
      res.status(200).send({
        confirmation: true,
        reqUserId,
        msgList
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        confirmation: false,
        msgList: [],
        message: "error occured while fetching message list"
      });
    }
  },
  readMsg: async (req, res) => {
    try {
      const currentUserId = req.user._id;
      const { targetUserId } = req.body;
      await messageModel.update(
        {
          $and: [{ from: targetUserId }, { to: currentUserId }]
        },
        { $set: { read: true } },
        {
          multi: true
        }
      );
      const msgList = await messageModel.find({
        $or: [{ from: currentUserId }, { to: currentUserId }]
      });
      res.status(200).send({
        confirmation: true,
        msgList
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        confirmation: false,
        message: "error occured while reading message"
      });
    }
  }
};
export default messageController;
