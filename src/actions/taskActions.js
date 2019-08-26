import axios from "axios";
import { API_KEY, TASKS_FORM, GET_TASKS, ADD_TASK_GROUP } from "../constants";
import uniqid from "uniqid";

export const getTasks = taskGroups => (dispatch, getState) => {
  let taskGroupsA = [];
  return axios
    .get(
      `https://api.jotform.com/form/${TASKS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index2 = 0; index2 < taskGroups.length; index2++) {
        const taskGroup = taskGroups[index2];
        const taskGroupID = taskGroup.id;
        const taskGroupName = taskGroup.name;
        let tasks = [];
        for (let index = 0; index < content.length; index++) {
          const answers = content[index].answers;
          const taskID = answers[3].answer;
          const taskJSON = JSON.parse(answers[4].answer);
          if (taskJSON.taskGroupID === taskGroupID) {
            tasks.push({
              taskID: taskID,
              ...taskJSON
            });
          }
        }
        taskGroupsA.push({
          name: taskGroupName,
          taskGroupID: taskGroupID,
          tasks: [...tasks]
        });
      }

      dispatch({
        type: GET_TASKS,
        payload: {
          ...getState().tasks,
          taskGroups: taskGroupsA
        }
      });
    });
};

export const addTaskGroup = taskGroupName => (dispatch, getState) => {
  const board = getState().board;
  const boardSubmission = board.submissionID;
  const taskGroupID = uniqid();
  const taskState = getState().task;
  const newTaskGroups = [
    ...board.taskGroups,
    { id: taskGroupID, name: taskGroupName }
  ];
  return axios({
    url: `https://api.jotform.com/submission/${boardSubmission}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${JSON.stringify({
      taskGroups: newTaskGroups
    })}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
      console.log(data);
      dispatch({
        type: ADD_TASK_GROUP,
        payload: {
          ...taskState,
          taskGroups: [
            ...taskState.taskGroups,
            { name: taskGroupName, taskGroupID: taskGroupID, tasks: [] }
          ]
        }
      });
    }
  });
};
