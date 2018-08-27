import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import socketIo from "socket.io";
import http from "http";

import config from "../config";
import routes from "./routes";

import "./utils/passport";

const app = express();
/* connect express with socket.io, first wrap app with server, then wrap server with socket.io */
const server = http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("socket io connected");
  socket.on("sendMsg", data => {
    console.log(data);
    io.emit("receiveMsg", data);
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
