import constants from "../constants";

const initialState = {
  msgList: [],
  unread: 0,
  error: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.MSG_ERROR:
      newState.error = action.payload.message;
      return newState;

    case constants.GET_MSG_LIST:
      newState.msgList = action.payload.msgList;
      newState.unread = action.payload.msgList.filter(m => !m.read).length;
      newState.error = "";
      return newState;

    case constants.MSG_RECEIVED:
      newState.msgList = newState.msgList
        ? newState.msgList.concat(action.payload)
        : action.payload.msgList;
      return newState;

    case constants.READ_MSG:
      newState.browseList = action.payload.browseList;
      return newState;

    default:
      return state;
  }
};
