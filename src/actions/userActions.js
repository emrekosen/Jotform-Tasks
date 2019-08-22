import axios from "axios";
import { API_KEY, SET_TEAMS, JOIN_TEAM, TEAMS_FORM } from "../constants";

export const getUserTeams = data => (dispatch, getState) => {
  const state = getState().user;
  const userEmail = getState().user.email;
  let userTeams = [];
  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        const teamID = submission.answers[5].answer;
        const teamsData = JSON.parse(submission.answers[6].answer);
        if (teamsData.users.includes(userEmail)) {
          userTeams.push({
            teamID: teamID,
            teamName: teamsData.teamName
          });
        }
      }
      dispatch({
        type: SET_TEAMS,
        payload: {
          ...state,
          isLoaded: true,
          teams: userTeams
        }
      });
    });
};

export const joinTeam = data => (dispatch, getState) => {
  const userEmail = getState().user.email;
  let teamSubmissionID;
  let newTeamData;
  let userTeams = getState().user.teams;

  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;
      console.log(content);
      for (let index = 0; index < content.length; index++) {
        const submission = content[index];
        console.log(submission.answers[6]);
        const teamID = submission.answers[5].answer;
        const teamData = JSON.parse(submission.answers[6].answer);
        if (teamID === data.teamID) {
          teamSubmissionID = submission.id;
          newTeamData = teamData;
        }
      }
      console.log(teamSubmissionID);
      newTeamData.users.push(userEmail);
      console.log(newTeamData);
      return axios({
        url: `https://api.jotform.com/submission/${teamSubmissionID}?apiKey=${API_KEY}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `submission[6]=${JSON.stringify(newTeamData)}`
      }).then(response => {
        const rData = response.data;
        if (rData.responseCode === 200) {
          dispatch({
            type: JOIN_TEAM,
            payload: {
              ...getState().user,
              teams: [...userTeams, data]
            }
          });
        }
      });
    });
};
