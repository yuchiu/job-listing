import constants from "../constants";

const initialState = {
  msgList: [],
  unread: 0,
  error: "",
  toUserInfo: {},
  isSubToMsg: true
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.MSG_ERROR:
      newState.error = action.payload.message;
      return newState;

    case constants.UPDATE_TO_USER_INFO:
      newState.toUserInfo = action.payload.user;
      return newState;

    case constants.READ_MSG:
      newState.msgList = action.payload.msgList;
      newState.unread = action.payload.msgList.filter(
        msg => !msg.read && msg.to === action.payload.reqUserId
      ).length;
      return newState;
    case constants.SUB_TO_MSG:
      newState.toUserInfo = {};
      return newState;

    case constants.CLEAR_TO_USER_INFO:
      newState.isSubToMsg = false;
      return newState;

    case constants.UNSUB_TO_MSG:
      newState.toUserInfo = true;
      return newState;

    case constants.GET_MSG_LIST:
      newState.msgList = action.payload.msgList;
      newState.unread = action.payload.msgList.filter(
        msg => !msg.read && msg.to === action.payload.reqUserId
      ).length;
      return newState;

    case constants.MSG_RECEIVED:
      newState.msgList = newState.msgList.concat(action.payload.msg);
      if (action.payload.to === action.payload.reqUserId) {
        newState.unread = state.unread + 1;
      } else {
        newState.unread = state.unread + 0;
      }
      return newState;

    default:
      return state;
  }
};
