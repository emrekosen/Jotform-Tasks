import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";

const allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  team: teamReducer
});

export default allReducers;
