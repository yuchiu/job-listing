import constants from "../constants";
import { browseService } from "./services";

const browseAction = {
  fetchList: () => async dispatch => {
    const response = await browseService.fetchList();
    dispatch({
      type: constants.FETCH_LIST,
      payload: response.data
    });
  },
  clearList: () => async dispatch => {
    dispatch({
      type: constants.CLEAR_LIST
    });
  }
};

export default browseAction;
