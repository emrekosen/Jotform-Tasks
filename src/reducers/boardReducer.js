import {
  GET_BOARD,
  UPDATE_BOARD,
  CREATE_BOARD,
  DELETE_TASK_GROUP,
  ADD_TASK_GROUP
} from "../constants/index";

const initalState = {
  isLoaded: false,
  submissionID: "",
  boardID: "",
  boardName: "",
  taskGroups: []
};

export default function boardReducer(state = initalState, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.payload || false;
    case UPDATE_BOARD:
      return action.payload || false;
    case CREATE_BOARD:
      return action.payload || false;
    case ADD_TASK_GROUP:
      return action.payload || false;
    case DELETE_TASK_GROUP:
      return action.payload || false;
    default:
      return state;
  }
}
