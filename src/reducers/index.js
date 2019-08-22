import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";
import boardReducer from "./boardReducer";
import taskReducer from "./taskReducer";

const allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  team: teamReducer,
  board: boardReducer,
  task: taskReducer
});

export default allReducers;
