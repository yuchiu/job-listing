import constants from "../constants";
import { browseService } from "./services";

const authAction = {
  fetchList: () => async dispatch => {
    const response = await browseService.fetchList();
    dispatch({
      type: constants.FETCH_LIST,
      payload: response
    });
  }
};

export default authAction;
