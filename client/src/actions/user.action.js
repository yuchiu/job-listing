import constants from "../constants";
import { authService } from "../services";

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
  logout: () => dispatch => {
    dispatch({
      type: constants.LOGOUT,
      payload: null
    });
  }
};

export default authAction;
