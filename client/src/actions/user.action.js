import constants from "../constants";
import { API } from "../utils";

const authAction = {
  followupUserInfo: (credentialFollowUp, user) => async dispatch => {
    const response = await API.followupUser(credentialFollowUp, user);
    dispatch({
      type: constants.FOLLOWUP_USER,
      payload: response
    });
  }
};

export default authAction;
