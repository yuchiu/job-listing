import { userModel } from "../models";

const userSummary = user => {
  const summary = {
    id: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
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

const userController = {
  followUp: async (req, res) => {
    try {
      const { credentials } = req.body;

      const user = await userModel.findOneAndUpdate(
        credentials.id,
        credentials,
        {
          new: true
        }
      );
      if (!user) {
        return res.send({
          confirmation: false,
          user: {},
          message: "user does not exist"
        });
      }
      res.send({
        confirmation: true,
        user: userSummary(user),
        message: "updated follow up successfully"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        confirmation: false,
        user: {},
        message: "an error has occured trying to update follow up"
      });
    }
  }
};

export default userController;
