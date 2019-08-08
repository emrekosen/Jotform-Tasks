import axios from "axios";
import history from "../utils/history";
import { LOGIN_SUCCESS, LOGIN_ERROR,  } from "../constants";

export const loginHandler = data => (dispatch, getState) => {
  console.log("login req");
  axios({
    url: "https://api.jotform.com/user/login",
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: `username=${data.username}&password=${data.password}`
  }).then(response => {
    console.log(response.data);
    if(response.data.responseCode === 403){
      dispatch({type:LOGIN_SUCCESS, payload: {...getState.auth, isLoggedIn: true,
      }});
      history.push(``);
    }

  }).catch(e=> {
    console.log(e);
  })
};
