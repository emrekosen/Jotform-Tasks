import {
  GET_TEAM,
  UPDATE_TEAM,
  CREATE_TEAM,
  TEAMS_FORM,
  API_KEY
} from "../constants";
import axios from "axios";

export const getTeam = data => (dispatch, getState) => {
  axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const answer = content[index];
        console.log(answer);
      }
    });
};

export const createTeam = data => (dispatch, getState) => {};
