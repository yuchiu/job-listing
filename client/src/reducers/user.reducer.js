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
    case constants.LOGIN:
      if (action.payload.confirmation) {
        auth.authenticateUser(action.payload.token, action.payload.user);
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = action.payload.user;
        newState.message = action.payload.message;
      } else {
        newState.isUserAuthenticated = auth.isUserAuthenticated();
        newState.user = state.user;
        newState.message = action.payload.message;
      }
      return newState;
    case constants.LOGOUT:
      auth.deauthenticateUser();
      newState.isUserAuthenticated = false;
      newState.user = {};
      newState.message = "log out successfully";
      return newState;
    case constants.EDIT_PROFILE:
      if (action.payload.confirmation) {
        newState.isProfileUpdated = action.payload.confirmation;
        newState.user = action.payload.user;
        newState.message = action.payload.message;
      } else {
        newState.isProfileUpdated = action.payload.confirmation;
        newState.user = state.user;
        newState.message = action.payload.message;
      }
      return newState;
    default:
      return state;
  }
};
