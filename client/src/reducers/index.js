import { combineReducers } from "redux";

import testingReducer from "./testing.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  userReducer,
  testingReducer
});

export default rootReducer;
