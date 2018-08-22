import constants from "../constants";
import { authService } from "../services";

const authAction = {
  verifyUser: token => async dispatch => {
    const response = await authService.validateJWT(token);
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },
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
