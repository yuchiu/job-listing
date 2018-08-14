import constants from "../constants";

const initialState = {
  text: "Redux Display Text"
};

const testingReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case constants.FETCH_TEXT:
      newState.text = action.payload;
      return newState;
    default:
      return state;
  }
};

export default testingReducer;
