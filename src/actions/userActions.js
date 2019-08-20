import axios from "axios";
import {
  API_KEY,
  USERS_FORM,
  SET_TEAMS,
  JOIN_TEAM,
  TEAMS_FORM
} from "../constants";

export const getUserTeams = data => (dispatch, getState) => {
  const state = getState().user;
  const userEmail = getState().user.email;
  let userTeams;
  return axios
    .get(
      `https://api.jotform.com/form/${USERS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        const email = submission.answers[5].answer;
        const teamsAnsw = submission.answers[8].answer;
        if (email === userEmail) {
          userTeams = JSON.parse(teamsAnsw).teams;
          dispatch({
            type: SET_TEAMS,
            payload: {
              ...state,
              submissionID: submission.id,
              isLoaded: true,
              teams: userTeams
            }
          });
          break;
        }
      }
    });
};

export const joinTeam = data => (dispatch, getState) => {
  const submissionID = getState().user.submissionID;
  const teams = getState().user.teams;
  let newTeams = [...teams, data];
  return axios({
    url: `https://api.jotform.com/submission/${submissionID}?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[8]=${JSON.stringify({ teams: newTeams })}`
  }).then(response => {
    const data = response.data;
    if (data.responseCode === 200) {
      dispatch({
        type: JOIN_TEAM,
        payload: {
          ...getState().user,
          teams: newTeams
        }
      });
    }
  });
};
