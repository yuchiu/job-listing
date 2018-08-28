import { combineReducers } from "redux";

import testingReducer from "./testing.reducer";
import userReducer from "./user.reducer";
import browseReducer from "./browse.reducer";
import messageReducer from "./message.reducer";

const rootReducer = combineReducers({
  userReducer,
  testingReducer,
  messageReducer,
  browseReducer
});

export default rootReducer;
