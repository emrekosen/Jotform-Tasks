import axios from "axios";
import {
  API_KEY,
  BOARDS_FORM,
  GET_BOARD,
  CREATE_BOARD,
  DELETE_BOARD,
  UPDATE_TEAM_BOARDS,
  DELETE_TASK_GROUP,
  CREATE_TAG
} from "../constants";
import uniqid from "uniqid";
import { deleteTask } from "./taskActions";
import history from "../utils/history";

export const getBoard = boardID => (dispatch, getState) => {
  return axios
    .get(
      `https://api.jotform.com/form/${BOARDS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;

      for (let index = 0; index < content.length; index++) {
        const answers = content[index].answers;
        if (answers[3].answer === boardID) {
          const boardID = answers[3].answer;
          const boardName = answers[4].answer;
          const boardDetail = JSON.parse(answers[5].answer);

          const teamID = answers[7].answer;
          dispatch({
            type: GET_BOARD,
            payload: {
              submissionID: content[index].id,
              teamID: teamID,
              boardID: boardID,
              boardName: boardName,
              taskGroups: boardDetail.taskGroups,
              tags: boardDetail.tags,
              isLoaded: true
            }
          });
        }
      }
      return "success";
    });
};

export const createBoard = boardName => (dispatch, getState) => {
  const teamState = getState().team;
  const boardID = uniqid();
  return axios({
    url: `https://api.jotform.com/form/${BOARDS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[3]=${boardID}&submission[4]=${boardName}&submission[5]=${JSON.stringify(
      {
        taskGroups: [],
        tags: [
          { name: "Urgent", color: "red" },
          { name: "Not started", color: "teal" },
          { name: "In progress", color: "yellow" }
        ]
      }
    )}&submission[7]=${teamState.teamID}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
      const newBoards = [
        {
          boardID: boardID,
          boardName: boardName
        },
        ...teamState.boards
      ];
      dispatch({
        type: CREATE_BOARD,
        payload: {
          teamID: teamState.teamID,
          boardID: boardID,
          boardName: boardName,
          taskGroups: [],
          tags: [
            { name: "Urgent", color: "red" },
            { name: "Not started", color: "teal" },
            { name: "In progress", color: "yellow" }
          ]
        }
      });
      dispatch({
        type: UPDATE_TEAM_BOARDS,
        payload: {
          ...getState().team,
          boards: newBoards
        }
      });
    }
    return boardID;
  });
};

export const getTeamBoards = teamID => (dispatch, getState) => {
  let teamBoards = [];
  return axios
    .get(
      `https://api.jotform.com/form/${BOARDS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const answers = content[index].answers;
        if (answers[7].answer === teamID) {
          const boardID = answers[3].answer;
          const boardName = answers[4].answer;
          teamBoards.push({ boardID: boardID, boardName: boardName });
        }
      }
      return teamBoards;
    });
};

export const deleteTaskGroup = taskGroupID => (dispatch, getState) => {
  const boardState = getState().board;
  const taskState = getState().task;
  const newTaskGroups = boardState.taskGroups.filter(
    taskGroup => taskGroup.taskGroupID !== taskGroupID
  );
  for (let i = 0; i < taskState.tasks.length; i++) {
    const element = taskState.tasks[i];
    if (element.taskGroupID === taskGroupID) {
      dispatch(deleteTask(element.submissionID));
    }
  }
  return axios({
    url: `https://api.jotform.com/submission/${boardState.submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${JSON.stringify({
      taskGroups: newTaskGroups,
      tags: boardState.tags
    })}`
  }).then(response => {
    const rData = response.data;
    if (rData.responseCode === 200) {
      dispatch({
        type: DELETE_TASK_GROUP,
        payload: {
          ...boardState,
          taskGroups: newTaskGroups
        }
      });
    }
  });
};

export const deleteBoard = boardID => (dispatch, getState) => {
  const boardState = getState().board;
  const teamState = getState().team;
  const newBoards = teamState.boards.filter(board => board.boardID !== boardID);
  for (let i = 0; i < boardState.taskGroups.length; i++) {
    const element = boardState.taskGroups[i];
    dispatch(deleteTaskGroup(element.taskGroupID));
  }
  return axios
    .delete(
      `https://api.jotform.com/submission/${boardState.submissionID}?apiKey=${API_KEY}`
    )
    .then(response => {
      if (response.data.responseCode === 200) {
        dispatch({
          type: DELETE_BOARD,
          payload: {
            isLoaded: false,
            submissionID: null,
            boardID: null,
            boardName: null,
            taskGroups: [],
            tags: [],
            teamID: boardState.teamID
          }
        });
        dispatch({
          type: UPDATE_TEAM_BOARDS,
          payload: {
            ...teamState,
            boards: newBoards
          }
        });
      }
    });
};

export const createTag = newTag => (dispatch, getState) => {
  const boardState = getState().board;
  let tags = boardState.tags;
  tags.push(newTag);
  return axios({
    url: `https://api.jotform.com/submission/${boardState.submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${JSON.stringify({
      taskGroups: boardState.taskGroups,
      tags: tags
    })}`
  }).then(response => {
    const rData = response.data;
    if (rData.responseCode === 200) {
      dispatch({
        type: CREATE_TAG,
        payload: {
          ...boardState,
          tags: tags
        }
      });
    }
  });
};
