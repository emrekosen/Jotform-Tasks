import { GET_TEAM, UPDATE_TEAM } from "../constants/index";

const initalState = {
  teamName: "",
  boards: [
    {
      boardID: "",
      boardName: "Sa",
      taskGroups: [
        {
          groupName: "",
          tasks: [
            {
              taskID: "",
              subject: "",
              description: "",
              time: "",
              dueDate: "",
              assignedBy: "",
              assignedTo: ""
            }
          ]
        }
      ]
    },
    {
      boardName: "As",
      taskGroups: [
        {
          groupName: "",
          tasks: [
            {
              taskID: "",
              subject: "",
              description: "",
              time: "",
              dueDate: "",
              assignedBy: "",
              assignedTo: ""
            }
          ]
        }
      ]
    }
  ]
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
