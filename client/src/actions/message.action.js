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
    const response = await messageService.getMsgList();
    dispatch({
      type: constants.GET_MSG,
      payload: response
    });
  }
};

export default messageAction;
