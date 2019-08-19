import { GET_BOARD, UPDATE_BOARD } from "../constants/index";

const initalState = {
  boardID: "",
  boardName: "",
  tasks: []
};

export default function boardReducer(state = initalState, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.payload || false;
    case UPDATE_BOARD:
      return action.payload || false;
    default:
      return state;
  }
}
