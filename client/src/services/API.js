import axios from "axios";
import { auth } from "../utils";

export default () =>
  axios.create({
    baseURL: `http://localhost:3200`,
    headers: {
      Authorization: `Bearer ${auth.getToken()}`
    }
  });
