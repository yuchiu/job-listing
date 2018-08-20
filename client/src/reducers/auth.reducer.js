import constants from "../constants";
import { auth, redirectPath } from "../utils";

const initialState = {
  isUserAuthenticated: false,
  redirectTo: "",
  user: {},
  message: {}
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.LOGIN:
      if (action.payload.confirmation) {
        newState.isUserAuthenticated = true;
        newState.user = action.payload.user;
        newState.message = {};
        newState.redirectTo = redirectPath(
          action.payload.user.role,
          action.payload.user.avatar
        );
      } else {
        newState.isUserAuthenticated = false;
        newState.user = {};
        newState.message = action.payload.message;
      }
      return newState;
    case constants.LOGOUT:
      newState.isUserAuthenticated = false;
      newState.user = {};
      newState.redirectTo = "";
      newState.message = {};
      return newState;
    default:
      return state;
  }
};
