import { combineReducers } from "redux";

import testingReducer from "./testing.reducer";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
  authReducer,
  testingReducer
});

export default rootReducer;
