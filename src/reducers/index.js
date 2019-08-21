import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";
import boardReducer from "./boardReducer";

const allReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  team: teamReducer,
  board: boardReducer
});

export default allReducers;
