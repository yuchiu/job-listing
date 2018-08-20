import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "../config";

import routes from "./routes";

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

const app = express();

/* remove cors in production env */
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
routes(app);

app.listen(config.PORT, () => {
  console.log(`app listenning on port ${config.PORT}`);
});
