import bcrypt from "bcryptjs";
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
  auth: (req, res) =>
    // check if user has cookie
    res.send({
      confirmation: true,
      code: 1
    }),
  register: async (req, res) => {
    try {
      const userInfo = req.body;
      const isUserCreated = await userModel.findOne({
        email: userInfo.email
      });
      if (isUserCreated) {
        return res.send({
          confirmation: false,
          message: "email address is not valid"
        });
      }

      // hash password & create user
      userInfo.password = bcrypt.hashSync(userInfo.password, 10);
      const user = await userModel.create(userInfo);
      res.send({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      console.log(err);

      return res.send({
        confirmation: false,
        message: "an error has occured trying to register"
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
        return res.send({
          confirmation: false,
          message: `this email account ${userInfo.email} is not yet registered`
        });
      }

      // validate password
      const isPasswordValid = bcrypt.compareSync(
        userInfo.password,
        user.password
      );
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.send({
          confirmation: false,
          message: "invalid log in information"
        });
      }

      // user is validated
      res.send({
        confirmation: true,
        user: userSummary(user)
      });
    } catch (err) {
      return res.send({
        confirmation: false,
        message: "an error has occured trying to login"
      });
    }
  }
};

export default authController;
