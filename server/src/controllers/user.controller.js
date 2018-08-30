import { userModel } from "../models";

const userSummary = user => {
  const summary = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    title: user.title,
    desc: user.desc,
    salary: user.salary,
    avatar: user.avatar,
    timestamp: user.timestamp
  };
  return summary;
};
const filterUserInfo = user => {
  const summary = {
    title: user.title,
    desc: user.desc,
    salary: user.salary,
    avatar: user.avatar
  };
  return summary;
};

const userController = {
  getUserInfo: async (req, res) => {
    try {
      const { userId } = req.params;
      // find user
      const user = await userModel.findOne({
        _id: userId
      });
      // if user does not exist
      if (!user) {
        return res.status(403).send({
          confirmation: false,
          user: {},
          message: "user does not exist"
        });
      }

      res.status(200).send({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        confirmation: false,
        user: {},
        message: "an error has occured trying to get user info"
      });
    }
  },

  followUp: async (req, res) => {
    try {
      const credentials = req.body;
      // find user
      const user = await userModel.findOne({
        email: credentials.email
      });
      // if email is not yet registered
      if (!user) {
        return res.status(403).send({
          confirmation: false,
          user: {},
          message: "user does not exist"
        });
      }
      const updatedUser = await userModel.findOneAndUpdate(
        { email: user.email },
        filterUserInfo(credentials),
        {
          new: true
        }
      );
      res.status(200).send({
        confirmation: true,
        user: userSummary(updatedUser)
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        confirmation: false,
        user: {},
        message: "an error has occured trying to update follow up"
      });
    }
  }
};

export default userController;
