import axios from "axios";
import {
  API_KEY,
  BOARDS_FORM,
  GET_BOARD,
  CREATE_BOARD,
  UPDATE_TEAM,
  CREATE_TEAM
} from "../constants";
import uniqid from "uniqid";
import { getTeam } from "./teamActions";

export const getBoard = boardID => (dispatch, getState) => {
  axios
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
          const taskGroups = JSON.parse(answers[5].answer);
          dispatch({
            type: GET_BOARD,
            payload: {
              boardID: boardID,
              boardName: boardName,
              taskGroups: taskGroups,
              isLoaded: true
            }
          });
        }
      }
    });
};

export const createBoard = boardName => (dispatch, getState) => {
  console.log("createBoard");
  const teamState = getState().team;
  const boardID = uniqid();
  const teamData = {
    teamName: teamState.teamName,
    users: teamState.users,
    boards: [...teamState.boards, { boardID: boardID, boardName: boardName }]
  };
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
    )}`
  }).then(response => {
    console.log("create board", response);
    const data = response.data;
    if (data.responseCode === 200) {
      dispatch({
        type: CREATE_BOARD,
        payload: {
          boardID: boardID,
          boardName: boardName,
          taskGroups: []
        }
      });
      return axios({
        url: `https://api.jotform.com/submission/${
          teamState.submissionID
        }?apiKey=${API_KEY}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `submission[6]=${JSON.stringify(teamData)}`
      }).then(response => {
        console.log(boardID);
        console.log("add board to team", response);
        const data = response.data;
        if (data.responseCode === 200) {
          dispatch({
            type: UPDATE_TEAM,
            payload: {
              ...getState().team,
              ...teamData
            }
          });
          dispatch(getTeam(teamState.teamID));
          return boardID;
        }
      });
    }
  });
};
