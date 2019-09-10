import {
  TEAMS_FORM,
  API_KEY,
  GET_TEAM,
  CREATE_TEAM,
  JOIN_TEAM,
  DELETE_TEAM,
  UPDATE_USER_TEAMS,
  BOARDS_FORM
} from "../constants";
import axios from "axios";
import uniqid from "uniqid";
import { getTeamBoards, deleteBoard } from "./boardActions";
import history from "../utils/history";

export const getTeam = teamID => (dispatch, getState) => {
  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        const answers = content[index].answers;
        if (answers[5].answer === teamID) {
          const team = JSON.parse(answers[6].answer);
          dispatch(getTeamBoards(answers[5].answer)).then(response1 => {
            dispatch({
              type: GET_TEAM,
              payload: {
                ...team,
                isLoaded: true,
                boards: response1,
                submissionID: submission.id,
                teamID: answers[5].answer
              }
            });
          });
        }
      }
      return "success";
    });
};

export const getAllTeams = () => (dispatch, getState) => {
  let allTeams = [];
  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        const teamID = submission.answers[5].answer;
        const teamName = JSON.parse(submission.answers[6].answer).teamName;
        allTeams.push({
          teamID: teamID,
          teamName: teamName
        });
      }
      return allTeams;
    });
};

export const createTeam = data => (dispatch, getState) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userState = getState().user;
  const userEmail = localUser.email;
  const newTeamID = uniqid();
  return axios({
    url: `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${newTeamID}&submission[6]=${JSON.stringify({
      teamName: data,
      users: [
        {
          email: userEmail,
          username: localUser.username,
          avatarUrl: localUser.avatarUrl
        }
      ]
    })}`
  }).then(response => {
    dispatch({
      type: CREATE_TEAM,
      payload: {
        ...getState().team,
        teamID: newTeamID,
        teamName: data,
        users: [
          {
            email: userEmail,
            username: localUser.username,
            avatarUrl: localUser.avatarUrl
          }
        ],
        boards: [],
        isLoaded: true
      }
    });
    dispatch({
      type: JOIN_TEAM,
      payload: {
        ...getState().user,
        teams: [{ teamID: newTeamID, teamName: data }, ...userState.teams]
      }
    });
    return newTeamID;
  });
};

export const deleteTeam = teamID => (dispatch, getState) => {
  const teamState = getState().team;
  const userState = getState().user;
  const newUserTeams = userState.teams.filter(team => team.teamID !== teamID);
  for (let i = 0; i < teamState.boards.length; i++) {
    const element = teamState.boards[i];
    dispatch(deleteBoard(element.boardID));
  }
  return axios
    .delete(
      `https://api.jotform.com/submission/${teamState.submissionID}?apiKey=${API_KEY}`
    )
    .then(response => {
      if (response.data.responseCode === 200) {
        dispatch({
          type: DELETE_TEAM,
          payload: {
            ...teamState,
            isLoaded: false,
            teamName: null,
            users: [],
            boards: [],
            submissionID: null,
            teamID: null
          }
        });
        dispatch({
          type: UPDATE_USER_TEAMS,
          payload: {
            ...userState,
            teams: newUserTeams
          }
        });
        history.push(`/teams`);
      }
    });
};

export const getTeamDetails = teamID => (dispatch, getState) => {
  let boards = [];
  let taskGroups = [];
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
          const taskGroupsJSON = JSON.parse(answers[5].answer).taskGroups;
          const teamID = answers[7].answer;
          boards.push({
            boardName,
            taskGroups: taskGroupsJSON
          });
        }
      }
    });
};
