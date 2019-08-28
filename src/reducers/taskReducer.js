import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  ADD_TASK_GROUP
} from "../constants/index";

const initalState = {
  tasks: []
};

export default function teamReducer(state = initalState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.payload || false;
    case CREATE_TASK:
      return action.payload || false;
    case DELETE_TASK:
      return action.payload || false;
    default:
      return state;
  }
}
