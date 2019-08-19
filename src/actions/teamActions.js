import {
  GET_TEAM,
  UPDATE_TEAM,
  CREATE_TEAM,
  TEAM_FORM,
  API_KEY
} from "../constants";
import axios from "axios";

export const getTeam = data => (dispatch, getState) => {
  // axios
  //   .get(
  //     `https://api.jotform.com/form/${TEAM_FORM}/submissions?apiKey=${API_KEY}`
  //   )
  //   .then(response => {
  //     const content = response.data.content;
  //     for (let index = 0; index < content.length; index++) {
  //       const answer = content[index];
  //       if (answer[5].answer === "Hermes") {
  //       }
  //     }
  //     console.log(content);
  //   });
};

export const createTeam = data => (dispatch, getState) => {};
