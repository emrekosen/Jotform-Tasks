import { GET_USER } from "../constants/index";

const initalState = {
  username: null,
};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    default:
      return state;
  }
}
