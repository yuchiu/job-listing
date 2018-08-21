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
    console.log("inside follow up");
    try {
      const credential = req.body;

      const user = await userModel.findOneAndUpdate(credential.id, credential, {
        new: true
      });
      if (!user) {
        return res.send({
          confirmation: false,
          message: "user does not exist"
        });
      }
      console.log(user);
      res.send({
        confirmation: true,
        user: userSummary(user),
        message: "updated follow up successfully"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        confirmation: false,
        message: "an error has occured trying to update follow up"
      });
    }
  }
};

export default userController;
