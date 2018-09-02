import axios from "axios";
import API from "./API";

const messageService = {
  getMsgList: async () => {
    const response = await API().get("message/getmsglist");
    return response;
  },
  readMsg: async targetUserId => {
    const response = await API().post("message/read", targetUserId);
    return response;
  }
};

export default messageService;
