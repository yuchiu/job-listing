import constants from "../constants";
import { API } from "../utils";

const authAction = {
  register: credential => async dispatch => {
    const { username, email, password, role } = credential;
    const response = await API.registerUser(username, email, password, role);
    dispatch({
      type: constants.LOGIN,
      payload: response
    });
  },

  login: credential => async dispatch => {
    const { email, password } = credential;
    const response = await API.loginUser(email, password);
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
