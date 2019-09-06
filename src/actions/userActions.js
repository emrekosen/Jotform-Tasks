import axios from "axios";
import { API_KEY, SET_TEAMS, JOIN_TEAM, TEAMS_FORM } from "../constants";

export const getUserTeams = data => (dispatch, getState) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const state = getState().user;
  const userEmail = localUser.email;
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
        const userList = teamsData.users;
        for (let index = 0; index < userList.length; index++) {
          const element = userList[index];
          if (element.email === userEmail) {
            userTeams.push({
              teamID: teamID,
              teamName: teamsData.teamName
            });
          }
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
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = localUser.email;
  const username = localUser.username;
  const userAvatar = localUser.avatarUrl;
  let teamSubmissionID;
  let newTeamData;
  let userTeams = getState().user.teams;

  return axios
    .get(
      `https://api.jotform.com/form/${TEAMS_FORM}/submissions?apiKey=${API_KEY}`
    )
    .then(response => {
      const content = response.data.content;

      for (let index = 0; index < content.length; index++) {
        const submission = content[index];

        const teamID = submission.answers[5].answer;
        const teamData = JSON.parse(submission.answers[6].answer);
        if (teamID === data.teamID) {
          teamSubmissionID = submission.id;
          newTeamData = teamData;
        }
      }

      newTeamData.users.push({
        email: userEmail,
        username: username,
        avatarUrl: userAvatar
      });

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
