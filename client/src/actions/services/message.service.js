import io from "socket.io-client";
import axios from "axios";
import API from "./API";

const socket = io("ws://localhost:9093");

const messageService = {
  //   sendMsg: async text => {
  //     const response = await axios.get;
  //   },
  getMsgList: async () => {
    const response = await API().get("message/getmsglist");
    return response;
  }
};

export default messageService;

// socket.emit("sendMsg", { text });
