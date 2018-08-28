import constants from "../constants";
import { browseService } from "./services";

const browseAction = {
  fetchList: () => async dispatch => {
    const response = await browseService.fetchList();
    dispatch({
      type: constants.FETCH_LIST,
      payload: response.data
    });
  }
};

export default browseAction;
