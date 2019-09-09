import axios from "axios";
import {
  API_KEY,
  TASKS_FORM,
  GET_TASKS,
  ADD_TASK_GROUP,
  CREATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
  CHANGE_TASK_GROUP,
  USERS_FORM
} from "../constants";
import uniqid from "uniqid";
import moment from "moment";

export const createTask = data => (dispatch, getState) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = getState().user;
  const currentTasks = getState().task;
  const taskID = uniqid();

  const task = {
    taskGroupID: data.taskGroupID,
    task: data.task,
    assignee: data.assignee,
    assignedBy: localUser.username,
    dueDate: data.newDueDate,
    createdAt: moment(Date()).format("L"),
    label: data.label,
    isDone: false
  };
  return axios({
    url: `https://api.jotform.com/form/${TASKS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[3]=${taskID}&submission[4]=${JSON.stringify(task)}`
  }).then(response => {
    const responseData = response.data;
    if (responseData.responseCode === 200) {
      dispatch({
        type: CREATE_TASK,
        payload: {
          ...currentTasks,
          tasks: [
            {
              submissionID: responseData.content.submissionID,
              taskID: taskID,
              ...task
            },
            ...currentTasks.tasks
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
      const taskGroupID = taskGroup.taskGroupID;
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

export const addTaskGroup = newTaskGroupName => (dispatch, getState) => {
  const board = getState().board;
  const boardSubmission = board.submissionID;
  const newTaskGroupID = uniqid();
  const newTaskGroups = [
    ...board.taskGroups,
    { taskGroupID: newTaskGroupID, taskGroupName: newTaskGroupName }
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
            { taskGroupName: newTaskGroupName, taskGroupID: newTaskGroupID }
          ]
        }
      });
    }
  });
};

export const deleteTask = submissionID => (dispatch, getState) => {
  const tasksState = getState().task;
  return axios
    .delete(
      `https://api.jotform.com/submission/${submissionID}?apiKey=${API_KEY}`
    )
    .then(response => {
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

export const toggleDoneTask = taskID => (dispatch, getState) => {
  const tasksState = getState().task;
  const tasksList = tasksState.tasks;
  const task = tasksState.tasks.find(task => task.taskID === taskID);

  return axios({
    url: `https://api.jotform.com/submission/${task.submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[4]=${JSON.stringify({
      taskID: task.taskID,
      taskGroupID: task.taskGroupID,
      task: task.task,
      assignee: task.assignee,
      assignedBy: task.assignedBy,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      label: task.label,
      isDone: !task.isDone
    })}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
      for (let i = 0; i < tasksList.length; i++) {
        const element = tasksList[i];
        if (element.taskID === taskID) {
          tasksList[i].isDone = !tasksList[i].isDone;
          break;
        }
      }
      dispatch({
        type: TOGGLE_TASK_DONE,
        payload: {
          ...tasksState,
          tasks: tasksList
        }
      });
    }
  });
};

export const getAvatar = assignee => (dispatch, getState) => {
  let avatarUrl;
  return axios
    .get(
      `https://api.jotform.com/form/${USERS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;

      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        if (submission.answers[9].answer === assignee) {
          avatarUrl = submission.answers[10].answer;
          break;
        }
      }
      return avatarUrl;
    });
};

export const moveTask = data => (dispatch, getState) => {
  const tasksState = getState().task;
  const tasksList = tasksState.tasks;
  const task = tasksState.tasks.find(task => task.taskID === data.taskID);

  return axios({
    url: `https://api.jotform.com/submission/${task.submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[4]=${JSON.stringify({
      taskID: task.taskID,
      taskGroupID: data.taskGroupID,
      task: task.task,
      assignee: task.assignee,
      assignedBy: task.assignedBy,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      labels: task.labels,
      isDone: task.isDone
    })}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
      for (let i = 0; i < tasksList.length; i++) {
        const element = tasksList[i];
        if (element.taskID === data.taskID) {
          tasksList[i].taskGroupID = data.taskGroupID;
          break;
        }
      }
      dispatch({
        type: CHANGE_TASK_GROUP,
        payload: {
          ...tasksState,
          tasks: tasksList
        }
      });
    }
  });
};

export const changeTask = data => (dispatch, getState) => {
  const tasksState = getState().task;
  const tasksList = tasksState.tasks;
  const task = tasksState.tasks.find(task => task.taskID === data.taskID);

  return axios({
    url: `https://api.jotform.com/submission/${task.submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[4]=${JSON.stringify({
      taskID: task.taskID,
      taskGroupID: task.taskGroupID,
      task: data.newTask,
      assignee: task.assignee,
      assignedBy: task.assignedBy,
      dueDate: data.newDueDate,
      createdAt: task.createdAt,
      labels: task.labels,
      isDone: task.isDone
    })}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
    }
  });
};
