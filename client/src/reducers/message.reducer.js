import constants from "../constants";

const initialState = {
  msgList: [],
  unread: 0,
  message: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.GET_MSG:
      newState.msgList = newState.msgList
        ? newState.msgList.concat(action.payload.msgList)
        : action.payload.msgList;
      newState.unread = action.payload.msgList.filter(m => !m.read).length;
      newState.message = "";
      return newState;
    case constants.MSG_ERROR:
      newState.message = action.payload.message;
      return newState;
    // case constants.RECEIVE_MSG:
    //   newState.browseList = action.payload.browseList;
    //   return newState;
    // case constants.READ_MSG:
    //   newState.browseList = action.payload.browseList;
    //   return newState;

    default:
      return state;
  }
};
