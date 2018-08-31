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
  }
};
export default messageController;
