import { LOGIN_SUCCESS, LOGIN_ERROR } from "../constants/index";

const initalState = {
  isLoggedIn: true,
  authError: null
};

export default function authReducer(state = initalState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload || false;
    case LOGIN_ERROR:
      return action.payload || false;
    default:
      return state;
  }
}
