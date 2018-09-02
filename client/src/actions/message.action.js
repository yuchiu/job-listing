import io from "socket.io-client";
import constants from "../constants";
import { messageService, authService } from "./services";

const socket = io("ws://localhost:3200");

const messageAction = {
  getToUserInfo: toUserId => async dispatch => {
    try {
      const response = await authService.getUserInfo(toUserId);
      const { data } = response;
      dispatch({
        type: constants.UPDATE_TO_USER_INFO,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MSG_ERROR,
        payload: data
      });
    }
  },
  clearMsgToUserInfo: () => dispatch => {
    dispatch({
      type: constants.CLEAR_TO_USER_INFO
    });
  },
  readMsg: targetUserId => async dispatch => {
    try {
      const response = await messageService.readMsg(targetUserId);
      const { data } = response;
      dispatch({
        type: constants.READ_MSG,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.MSG_ERROR,
        payload: data
      });
    }
  },
  subToMsg: () => dispatch => {
    dispatch({
      type: constants.SUB_TO_MSG
    });
  },
  unSubToMsg: () => dispatch => {
    dispatch({
      type: constants.UNSUB_TO_MSG
    });
  },
  sendMsg: msgInfo => () => {
    socket.emit("sendMsg", msgInfo);
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
