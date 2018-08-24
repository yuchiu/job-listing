import constants from "../constants";
import { authService } from "./services";

const authAction = {
  register: credentials => async dispatch => {
    const response = await authService.registerUser(credentials);
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },

  login: credentials => async dispatch => {
    const response = await authService.loginUser(credentials);
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },
  followupUserInfo: (followUpCredentials, userId) => async dispatch => {
    const response = await authService.followupUser(
      followUpCredentials,
      userId
    );
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },
  editProfile: credentials => async dispatch => {
    console.log("action in side");
    console.log(credentials);

    const response = await authService.editProfileRequest(credentials);
    console.log("response in side");
    console.log(response);
    dispatch({
      type: constants.EDIT_PROFILE,
      payload: response
    });
  },
  logout: () => dispatch => {
    dispatch({
      type: constants.LOGOUT,
      payload: null
    });
  }
};

export default authAction;
