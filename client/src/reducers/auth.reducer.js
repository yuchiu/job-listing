import constants from "../constants";
import { auth } from "../utils";

const initialState = {
  isUserAuthenticated: false,
  user: {},
  error: {}
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.LOGIN:
      newState.isUserAuthenticated = true;
      newState.user = action.payload.user;
      newState.error = {};
      return newState;
    case constants.LOGOUT:
      newState.isUserAuthenticated = false;
      newState.user = {};
      newState.error = {};
      return newState;
    default:
      return state;
  }
};
