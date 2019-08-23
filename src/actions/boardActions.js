import axios from "axios";
import {
  API_KEY,
  BOARDS_FORM,
  GET_BOARD,
  CREATE_BOARD,
  GET_TEAM_BOARDS,
  UPDATE_TEAM_BOARDS
} from "../constants";
import uniqid from "uniqid";

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
          const taskGroupsJSON = JSON.parse(answers[5].answer);
          const teamID = answers[7].answer;
          dispatch({
            type: GET_BOARD,
            payload: {
              submissionID: content[index].id,
              teamID: teamID,
              boardID: boardID,
              boardName: boardName,
              taskGroups: taskGroupsJSON.taskGroups,
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
        taskGroups: []
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
          taskGroups: []
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
