import { combineReducers } from "redux";

import testingReducer from "./testing.reducer";
import userReducer from "./user.reducer";
import browseReducer from "./browse.reducer";

const rootReducer = combineReducers({
  userReducer,
  testingReducer,
  browseReducer
});

export default rootReducer;
