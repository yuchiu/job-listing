import { defineState } from "redux-localstore";

import constants from "../constants";
import { auth } from "../utils";

const defaultState = {
  isUserAuthenticated: false,
  isProfileUpdated: false,
  user: {},
  message: ""
};

const initialState = defineState(defaultState)("userReducer");

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.AUTH_ERROR:
      newState.message = action.payload.message;
      return newState;
    case constants.LOGIN:
      auth.authenticateUser(action.payload.token, action.payload.user);
      newState.isUserAuthenticated = auth.isUserAuthenticated();
      newState.user = action.payload.user;
      newState.message = "";
      return newState;
    case constants.LOGOUT:
      auth.deauthenticateUser();
      newState.isUserAuthenticated = auth.isUserAuthenticated();
      newState.user = {};
      newState.message = "";
      return newState;
    case constants.EDIT_PROFILE:
      newState.isProfileUpdated = true;
      newState.user = action.payload.user;
      newState.message = "";
      return newState;
    default:
      return state;
  }
};
