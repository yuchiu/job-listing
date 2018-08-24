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

const noIdUserSummary = user => {
  const summary = {
    password: user.password,
    title: user.title,
    desc: user.desc,
    salary: user.salary
  };
  return summary;
};

const authController = {
  register: async (req, res) => {
    try {
      const credentials = req.body;
      const isUserCreated = await userModel.findOne({
        email: credentials.email
      });
      if (isUserCreated) {
        return res.send({
          confirmation: false,
          user: {},
          message: "email address is not valid"
        });
      }

      // hash password & create user
      credentials.password = bcrypt.hashSync(credentials.password, 10);
      const user = await userModel.create(credentials);
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
      const credentials = req.body;
      const user = await userModel.findOne({
        email: credentials.email
      });

      // if email is not yet registered
      if (!user) {
        return res.send({
          confirmation: false,
          user: {},
          message: `this email account ${
            credentials.email
          } is not yet registered`
        });
      }

      // validate password
      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.send({
          confirmation: false,
          user: {},
          message: "invalid password"
        });
      }

      // user is validated
      res.send({
        confirmation: true,
        user: userSummary(user),
        token: jwtSignUser(user),
        message: "sign in successfully"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        confirmation: false,
        user: {},
        message: "an error has occured trying to login"
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const credentials = req.body;

      // find user
      const user = await userModel.findOne({
        email: credentials.email
      });

      // if email is not yet registered
      if (!user) {
        return res.send({
          confirmation: false,
          user: {},
          message: "user does not exist"
        });
      }

      // validate password
      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.send({
          confirmation: false,
          user: {},
          message: "invalid password"
        });
      }

      // hash new password
      const newPassword = bcrypt.hashSync(credentials.newPassword, 10);

      // user is valid, assign user's password with new password
      const updatedCredentials = Object.assign({}, credentials, {
        password: newPassword
      });
      delete updatedCredentials.newPassword;
      const validUser = await userModel.findOneAndUpdate(
        user.id,
        noIdUserSummary(updatedCredentials),
        {
          new: true
        }
      );
      res.send({
        confirmation: true,
        user: userSummary(validUser),
        message: "updated user profile succesfully"
      });
    } catch (err) {
      console.log(err);
      return res.send({
        confirmation: false,
        message: "an error has occured trying to update Profile"
      });
    }
  }
};

export default authController;
