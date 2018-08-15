import { userModel } from "../models";

const userSummary = user => {
  const summary = {
    id: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    timestamp: user.timestamp
  };
  return summary;
};

const authController = {
  register: async (req, res) => {
    try {
      const userInfo = req.body;
      const isUserCreated = await userModel.findOne({
        email: userInfo.email
      });
      if (isUserCreated) {
        res.json({
          confirmation: false,
          error: "email address is not valid"
        });
      }

      const user = await userModel.create(userInfo);
      res.json({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);
      res.json({
        confirmation: false,
        error: "an error has occured trying to register"
      });
    }
  },
  login: async (req, res) => {
    try {
      const userInfo = req.body;
      const user = await userModel.findOne({
        email: userInfo.email
      });

      // if email is not yet registered
      if (!user) {
        res.json({
          confirmation: false,
          error: `this email account ${userInfo.email} is not yet registered`
        });
      }

      // if password is incorrect
      if (userInfo.password !== user.password) {
        res.json({
          confirmation: false,
          error: "invalid log in information"
        });
      }

      // user is validated
      res.json({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      res.json({
        confirmation: false,
        error: "an error has occured trying to login"
      });
    }
  }
};

export default authController;
