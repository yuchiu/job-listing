import constants from "../constants";

const initialState = {
  msgList: [],
  unread: 0
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.GET_MSG:
      newState.msgList = newState.msgList
        ? newState.msgList.concat(action.payload.data.msgList)
        : action.payload.data.msgList;
      newState.unread = action.payload.data.msgList.filter(m => !m.read).length;
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
