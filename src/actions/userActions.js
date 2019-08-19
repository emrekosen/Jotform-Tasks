import axios from "axios";
import { API_KEY, USER_FORM, SET_TEAMS } from "../constants";

export const getTeams = data => (dispatch, getState) => {
  const state = getState().user;
  const userEmail = getState().user.email;
  let userTeams;
  axios
    .get(
      `https://api.jotform.com/form/${USER_FORM}/submissions?apiKey=${API_KEY}`
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
              teams: userTeams
            }
          });
          break;
        }
      }
    });
};

export const addTeam = data => (dispatch, getState) => {};
