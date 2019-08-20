import axios from "axios";
import { API_KEY, BOARD_FORM } from "../constants";

export const getTeamBoards = data => (dispatch, getState) => {
  axios
    .get(
      `https://api.jotform.com/form/${BOARD_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
    });
};

export const addTeam = data => (dispatch, getState) => {};
