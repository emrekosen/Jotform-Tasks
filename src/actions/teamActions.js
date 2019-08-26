import {
  TEAMS_FORM,
  API_KEY,
  GET_TEAM,
  CREATE_TEAM,
  JOIN_TEAM
} from "../constants";
import axios from "axios";
import uniqid from "uniqid";
import { getTeamBoards } from "./boardActions";

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
  const userState = getState().user;
  const userEmail = userState.email;
  const newTeamID = uniqid();
  return axios({
    url: `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${newTeamID}&submission[6]=${JSON.stringify({
      teamName: data,
      users: [{ email: userEmail, username: userState.username }]
    })}`
  }).then(response => {
    dispatch({
      type: CREATE_TEAM,
      payload: {
        ...getState().team,
        teamID: newTeamID,
        teamName: data,
        users: [{ email: userEmail, username: userState.username }],
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
