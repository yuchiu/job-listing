import constants from "../constants";
import { auth, redirectPath } from "../utils";

const initialState = {
  isUserAuthenticated: false,
  redirectTo: "",
  user: {},
  message: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.LOGIN:
      if (action.payload.confirmation) {
        auth.authenticateUser(action.payload.token, action.payload.user);
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = action.payload.user;
        newState.message = action.payload.message;
        newState.redirectTo = redirectPath(
          action.payload.user.role,
          action.payload.user.avatar
        );
      } else {
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = {};
        newState.message = action.payload.message;
      }
      return newState;
    case constants.LOGOUT:
      auth.deauthenticateUser();
      newState.isUserAuthenticated = auth.isUserAuthenticated();
      newState.user = {};
      newState.redirectTo = "";
      newState.message = "";
      return newState;
    case constants.FOLLOWUP_USER:
      if (action.payload.confirmation) {
        newState.user = action.payload.user;
        newState.message = action.payload.message;
        newState.redirectTo = redirectPath(
          action.payload.user.role,
          action.payload.user.avatar
        );
      } else {
        newState.user = state.user;
        newState.message = action.payload.message;
      }
      return newState;
    default:
      return state;
  }
};
