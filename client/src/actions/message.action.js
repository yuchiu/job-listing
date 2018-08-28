import constants from "../constants";
import { messageService } from "./services";

const messageAction = {
  //   sendMsg: text => async dispatch => {
  //     const response = await messageService.sendMsg(text);
  //     dispatch({
  //       type: constants.SEND_MSG,
  //       payload: response
  //     });
  //   },

  getMsgList: () => async dispatch => {
    try {
      const response = await messageService.getMsgList();
      const { data } = response;
      dispatch({
        type: constants.GET_MSG,
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
