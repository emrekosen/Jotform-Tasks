import { TEAMS_FORM, API_KEY, GET_TEAM, CREATE_TEAM } from "../constants";
import axios from "axios";
import uniqid from "uniqid";
import { joinTeam } from "./userActions";

export const getTeam = teamID => (dispatch, getState) => {
  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const answers = content[index].answers;
        if (answers[5].answer === teamID) {
          const team = JSON.parse(answers[6].answer);
          dispatch({
            type: GET_TEAM,
            payload: {
              ...getState().team,
              ...team
            }
          });
        }
      }
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
  const userEmail = getState().user.email;
  const newTeamID = uniqid();
  return axios({
    url: `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `submission[5]=${newTeamID}&submission[6]=${JSON.stringify({
      teamName: data,
      users: [userEmail],
      boards: []
    })}`
  }).then(response => {
    dispatch({
      type: CREATE_TEAM,
      payload: {
        ...getState().team,
        teamID: newTeamID,
        teamName: data,
        users: [userEmail],
        boards: []
      }
    });
    dispatch(joinTeam({ teamID: newTeamID, teamName: data }));
    return newTeamID;
  });
};
