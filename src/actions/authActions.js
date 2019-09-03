import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_USER,
  USERS_FORM,
  API_KEY,
  LOGOUT
} from "../constants";
import history from "../utils/history";
import { toggleHandler } from "./sidebarActions";

export const loginHandler = data => (dispatch, getState) => {
  let isExist = false;
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

      let content = data.content;
      if (data.responseCode === 200) {
        axios
          .get(
            `https://api.jotform.com/form/${USERS_FORM}/submissions?apiKey=${API_KEY}`
          )
          .then(response => {
            const content2 = response.data.content;
            for (let index = 0; index < content2.length; index++) {
              const submission = content2[index];
              if (submission.answers[5].answer === content.email) {
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              return axios({
                url: `https://api.jotform.com/submission/form/${USERS_FORM}/submissions?apiKey=${API_KEY}`,
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: `submission[5]${content.email}=&submission[9]=${content.username}&submission[10]=${content.avatarUrl}`
              }).then(response => {
                const data = response.data;
                if (data.responseCode === 200) {
                  dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                      ...getState.auth,
                      isLoggedIn: true,
                      authError: null
                    }
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
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: content.username,
                      email: content.email,
                      avatarUrl: content.avatarUrl
                    })
                  );
                  history.push("/teams");
                }
              });
            }
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
            localStorage.setItem(
              "user",
              JSON.stringify({
                username: content.username,
                email: content.email,
                avatarUrl: content.avatarUrl
              })
            );
            history.push("/teams");
          });
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
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "ekosen",
            email: "kosenemre@gmail.com",
            avatarUrl: "https://www.jotform.com/images/avatars/avatar-59.png"
          })
        );
        history.push("/teams");
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const logoutHandler = () => (dispatch, getState) => {
  axios.get("https://api.jotform.com/v1/user/logout").then(response => {
    if (response.data.responseCode == 200) {
      localStorage.removeItem("user");
      history.push("/login");
    }
    localStorage.removeItem("user");
    dispatch({
      type: LOGOUT,
      payload: {
        ...getState().auth,
        isLoggedIn: false
      }
    });
    history.push("/");
  });
};
