import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import sidebarReducer from "./sidebarReducer";

const allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  sidebar: sidebarReducer
});

export default allReducers;
