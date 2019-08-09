import axios from "axios";
import { Router } from "react-router";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../constants";
import history from "../utils/history";

export const loginHandler = (x, data) => (dispatch, getState) => {
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
      if (data.responseCode === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...getState.auth, isLoggedIn: true, authError: null }
        });
      } else if (data.responseCode === 401) {
        dispatch({
          type: LOGIN_ERROR,
          payload: {
            ...getState.auth,
            isLoggedIn: false,
            authError: "Please check your username and password"
          }
        });
      } else if (data.responseCode === 403) {
        dispatch({
          type: LOGIN_ERROR,
          payload: {
            ...getState.auth,
            isLoggedIn: false,
            authError: "Too many requests please try again later"
          }
        });
        console.log("history push");
        history.push("/");
        console.log("history push completed");
      }
    })
    .catch(e => {
      console.log(e);
    });
};
