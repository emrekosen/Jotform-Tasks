import { GET_TASKS, ADD_TASK, DELETE_TASK } from "../constants/index";

const initalState = {
  taskGroups: []
};

export default function teamReducer(state = initalState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.payload || false;
    case ADD_TASK:
      return action.payload || false;
    case DELETE_TASK:
      return action.payload || false;
    default:
      return state;
  }
}
