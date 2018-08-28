import { messageModel } from "../models";

const messageController = {
  getMsgList: async (req, res) => {
    try {
      // req.user is retreived from auth.policy
      const userId = req.user.id;
      console.log("userId:");
      console.log(userId);
      const msgList = await messageModel.find();
      res.status(200).send({
        confirmation: true,
        msgList,
        message: "get message list success!"
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        confirmation: false,
        msgList: [],
        message: "error occured while fetching message list"
      });
    }
  }
};
export default messageController;
