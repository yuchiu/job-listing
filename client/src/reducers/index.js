import { combineReducers } from "redux";

import testingReducer from "./testing.reducer";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  testingReducer
});

export default rootReducer;
