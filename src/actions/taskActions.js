import axios from "axios";
import {
  API_KEY,
  TASKS_FORM,
  GET_TASKS,
  ADD_TASK_GROUP,
  CREATE_TASK,
  DELETE_TASK
} from "../constants";
import uniqid from "uniqid";
import moment from "moment";

export const createTask = data => (dispatch, getState) => {
  const currentUser = getState().user;
  const currentTasks = getState().task;
  const taskID = uniqid();
  const task = {
    taskGroupID: data.taskGroupID,
    task: data.task,
    assignee: data.assignee,
    assignedBy: currentUser.username,
    dueDate: data.dueDate,
    createdAt: moment(Date()).format("L"),
    labels: []
  };
  return axios({
    url: `https://api.jotform.com/form/${TASKS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[3]=${taskID}&submission[4]=${JSON.stringify(task)}`
  }).then(response => {
    console.log(response);
    const responseData = response.data;
    if (responseData.responseCode === 200) {
      dispatch({
        type: CREATE_TASK,
        payload: {
          ...currentTasks,
          tasks: [
            ...currentTasks.tasks,
            {
              submissionID: responseData.content.submissionID,
              taskID: taskID,
              ...task
            }
          ]
        }
      });
    }
  });
};
export const getTasks = taskGroups => (dispatch, getState) => {
  let tasks = [];
  return axios({
    url: `https://api.jotform.com/form/${TASKS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "GET"
  }).then(response => {
    const content = response.data.content;
    for (let index2 = 0; index2 < taskGroups.length; index2++) {
      const taskGroup = taskGroups[index2];
      const taskGroupID = taskGroup.id;
      for (let index = 0; index < content.length; index++) {
        const answers = content[index].answers;
        const taskID = answers[3].answer;
        const taskJSON = JSON.parse(answers[4].answer);
        if (taskJSON.taskGroupID === taskGroupID) {
          tasks.push({
            submissionID: content[index].id,
            taskID: taskID,
            ...taskJSON
          });
        }
      }
    }

    dispatch({
      type: GET_TASKS,
      payload: {
        ...getState().tasks,
        tasks: tasks
      }
    });
  });
};

export const addTaskGroup = taskGroupName => (dispatch, getState) => {
  const board = getState().board;
  const boardSubmission = board.submissionID;
  const taskGroupID = uniqid();
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
      dispatch({
        type: ADD_TASK_GROUP,
        payload: {
          ...board,
          taskGroups: [
            ...board.taskGroups,
            { name: taskGroupName, id: taskGroupID }
          ]
        }
      });
    }
  });
};

export const deleteTask = submissionID => (dispatch, getState) => {
  console.log("function called");
  const tasksState = getState().task;
  console.log("request");
  return axios
    .delete(
      `https://api.jotform.com/submission/${submissionID}?apiKey=${API_KEY}`
    )
    .then(response => {
      console.log("response", response);
      dispatch({
        type: DELETE_TASK,
        payload: {
          ...tasksState,
          tasks: tasksState.tasks.filter(
            task => task.submissionID !== submissionID
          )
        }
      });
    });
};
