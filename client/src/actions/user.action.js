import constants from "../constants";
import { authService } from "./services";

const authAction = {
  autoLogin: () => async dispatch => {
    const response = await authService.autoLogin();
    const { data } = response;
    dispatch({
      type: constants.AUTO_LOGIN,
      payload: data
    });
  },

  register: credentials => async dispatch => {
    try {
      const response = await authService.registerUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },

  login: credentials => async dispatch => {
    try {
      const response = await authService.loginUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },
  followupUserInfo: followUpCredentials => async dispatch => {
    try {
      const response = await authService.followupUser(followUpCredentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },
  editProfile: credentials => async dispatch => {
    try {
      const response = await authService.editProfileRequest(credentials);
      const { data } = response;
      dispatch({
        type: constants.EDIT_PROFILE,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },
  logout: () => dispatch => {
    dispatch({
      type: constants.LOGOUT,
      payload: null
    });
  }
};

export default authAction;
