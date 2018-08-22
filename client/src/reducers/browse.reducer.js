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
      newState.message = action.payload.message;
      return newState;
    default:
      return state;
  }
};
