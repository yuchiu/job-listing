import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import socketIo from "socket.io";
import http from "http";

import config from "../config";
import routes from "./routes";

import "./utils/passport";
import { messageModel } from "./models";

const app = express();
/* connect express with socket.io, first wrap app with server, then wrap server with socket.io */
const server = http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("socket io connected");
  socket.on("sendMsg", async data => {
    const { fromUserId, toUserId, text } = data;
    const chatId = [fromUserId, toUserId].sort().join("_");
    const msg = await messageModel.create({
      from: fromUserId,
      chatId,
      to: toUserId,
      content: text
    });
    io.emit("receiveMsg", msg);
    // messageModel.create(
    //   {
    //     from: fromUserId,
    //     chatid: chatId,
    //     to: toUserId,
    //     content: text
    //   },
    //   (err, doc) => {
    //     io.emit("receiveMsg", Object.assign({}, doc._doc));
    //   }
    // );
  });
});

/* express middleware */
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
routes(app);

/* listen to port */
server.listen(config.PORT, () => {
  console.log(`app listenning on port ${config.PORT}`);
});

/* database setting */
mongoose.connect(
  config.DB_LOCAL,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`DB Connection failed:${err}`);
    } else {
      console.log("DB Connection Success");
    }
  }
);
