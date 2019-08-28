import {
  GET_TEAM,
  UPDATE_TEAM,
  GET_TEAM_BOARDS,
  UPDATE_TEAM_BOARDS,
  DELETE_TEAM
} from "../constants/index";

const initalState = {
  isLoaded: false,
  teamID: "",
  teamName: "",
  users: [],
  boards: [],
  submissionID: ""
};

export default function teamReducer(state = initalState, action) {
  switch (action.type) {
    case GET_TEAM:
      return action.payload || false;
    case UPDATE_TEAM:
      return action.payload || false;
    case GET_TEAM_BOARDS:
      return action.payload || false;
    case UPDATE_TEAM_BOARDS:
      return action.payload || false;
    case DELETE_TEAM:
      return action.payload || false;
    default:
      return state;
  }
}
