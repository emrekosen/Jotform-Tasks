import {
  GET_USER,
  SET_USER,
  SET_TEAMS,
  JOIN_TEAM,
  UPDATE_USER_TEAMS
} from "../constants/index";

const initalState = {
  isLoaded: false,
  username: null,
  avatarUrl: "",
  email: "",
  teams: [],
  submissionID: ""
};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    case SET_USER:
      return action.payload || false;
    case SET_TEAMS:
      return action.payload || false;
    case JOIN_TEAM:
      return action.payload || false;
    case UPDATE_USER_TEAMS:
      return action.payload || false;
    default:
      return state;
  }
}
