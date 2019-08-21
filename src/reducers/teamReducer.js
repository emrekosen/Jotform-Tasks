import { GET_TEAM, UPDATE_TEAM } from "../constants/index";

const initalState = {
  isLoaded: false,
  teamID: "",
  teamName: "",
  users: [],
  boards: []
};

export default function teamReducer(state = initalState, action) {
  switch (action.type) {
    case GET_TEAM:
      return action.payload || false;
    case UPDATE_TEAM:
      return action.payload || false;
    default:
      return state;
  }
}
