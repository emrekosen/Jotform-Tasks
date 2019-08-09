import { SIDE_BAR_TOGGLE } from "../constants/index";

const initalState = {
  isOpen: false
};

export default function sidebarReducer(state = initalState, action) {
  switch (action.type) {
    case SIDE_BAR_TOGGLE:
      return action.payload || false;
    default:
      return state;
  }
}
