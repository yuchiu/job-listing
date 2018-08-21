import constants from "../constants";
import { API } from "../utils";

const authAction = {
  register: credential => async dispatch => {
    const response = await API.registerUser(credential);
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },

  login: credential => async dispatch => {
    const response = await API.loginUser(credential);
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
