import constants from "../constants";

const initialState = {
  browseList: [],
  message: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.FETCH_LIST:
      newState.browseList = action.payload.browseList;
      return newState;
    case constants.CLEAR_LIST:
      newState.browseList = [];
      return newState;
    default:
      return state;
  }
};
