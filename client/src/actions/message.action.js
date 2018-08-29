import io from "socket.io-client";
import constants from "../constants";
import { messageService } from "./services";

const socket = io("ws://localhost:3200");

const messageAction = {
  sendMsg: msgInfo => dispatch => {
    socket.emit("sendMsg", msgInfo);
    dispatch(messageAction.receiveMsg);
  },
  receiveMsg: () => dispatch => {
    socket.on("receiveMsg", data => {
      dispatch(messageAction.msgReceived(data));
    });
  },
  msgReceived: data => async dispatch => {
    dispatch({
      type: constants.MSG_RECEIVED,
      payload: data
    });
  },
  getMsgList: () => async dispatch => {
    try {
      const response = await messageService.getMsgList();
      const { data } = response;
      dispatch({
        type: constants.GET_MSG_LIST,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MSG_ERROR,
        payload: data
      });
    }
  }
};

export default messageAction;
