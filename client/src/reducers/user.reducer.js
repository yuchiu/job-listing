import constants from "../constants";
import { auth, redirectPath } from "../utils";

const initialState = {
  user: {},
  followUpMessage: ""
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.FOLLOWUP_USER:
      if (action.payload.confirmation) {
        newState.user = action.payload.user;
        newState.followUpMessage = action.payload.message;
      } else {
        newState.user = state.user;
        newState.followUpMessage = action.payload.message;
      }
      return newState;
    default:
      return state;
  }
};
