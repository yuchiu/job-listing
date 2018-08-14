import constants from "../constants";

const testingAction = {
  fetchText: text => dispatch => {
    dispatch({
      type: constants.FETCH_TEXT,
      payload: text
    });
  }
};

export default testingAction;
