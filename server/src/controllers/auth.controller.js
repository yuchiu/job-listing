import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models";

import config from "../../config";

const jwtSignUser = user => {
  try {
    const userJson = user.toJSON();
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(userJson, config.JWT_SECRET, {
      expiresIn: ONE_WEEK
    });
  } catch (err) {
    console.log(err);
  }
};
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
    avatar: user.avatar,
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
        user: userSummary(user),
        token: jwtSignUser(user),
        message: "registered successfully"
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
      if (!isPasswordValid) {
        return res.send({
          confirmation: false,
          message: "invalid log in information"
        });
      }

      // user is validated
      res.cookie("userid", user._id);
      res.send({
        confirmation: true,
        user: userSummary(user),
        token: jwtSignUser(user),
        message: "sign in successfully"
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
