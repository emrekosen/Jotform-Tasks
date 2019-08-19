import { GET_USER, SET_USER, SET_TEAMS, ADD_TEAM } from "../constants/index";

const initalState = {
  username: null,
  avatarUrl: "",
  email: "kosenemre@gmail.com",
  teams: []
};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    case SET_USER:
      return action.payload || false;
    case SET_TEAMS:
      return action.payload || false;
    case ADD_TEAM:
      return action.payload || false;
    default:
      return state;
  }
}
