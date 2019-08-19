import {
  TEAMS_FORM,
  API_KEY,
  GET_TEAM
} from "../constants";
import axios from "axios";

export const getTeam = teamID => (dispatch, getState) => {
  console.log("getTeam called");
  console.log(teamID);
  axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const answers = content[index].answers;
        console.log(answers);
        if (answers[5].answer === teamID) {
          console.log("find");
          const team = JSON.parse(answers[6].answer);
          console.log(team);
          dispatch({
            type: GET_TEAM,
            payload: {
              ...getState().team,
              ...team
            }
          })
        }
      }
    });
};


export const createTeam = data => (dispatch, getState) => { };
