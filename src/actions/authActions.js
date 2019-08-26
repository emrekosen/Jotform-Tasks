import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_ERROR, SET_USER } from "../constants";
import history from "../utils/history";

export const loginHandler = data => (dispatch, getState) => {
  axios({
    url: "https://api.jotform.com/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `username=${data.username}&password=${data.password}`
  })
    .then(response => {
      let data = response.data;
      console.log(data);
      let content = data.content;
      if (data.responseCode === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...getState.auth, isLoggedIn: true, authError: null }
        });
        dispatch({
          type: SET_USER,
          payload: {
            ...getState().user,
            username: content.username,
            email: content.email,
            avatarUrl: content.avatarUrl
          }
        });
        history.push("/teams");
      } else if (data.responseCode === 401) {
        dispatch({
          type: LOGIN_ERROR,
          payload: {
            ...getState().auth,
            isLoggedIn: false,
            authError: "Please check your username and password"
          }
        });
      } else if (data.responseCode === 403) {
        dispatch({
          type: LOGIN_ERROR,
          payload: {
            ...getState().auth,
            isLoggedIn: true,
            authError: "Too many requests please try again later"
          }
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
};
