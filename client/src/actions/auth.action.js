import constants from "../constants";

const authAction = {
  login: userInfo => dispatch => {
    dispatch({
      type: constants.LOGIN,
      payload: userInfo
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
