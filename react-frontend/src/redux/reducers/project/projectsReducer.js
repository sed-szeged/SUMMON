import { SET_PROJECT, SET_PROJECT_SELECT } from "../../actions/types";

const initialState = {
  select: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    case SET_PROJECT_SELECT:
      return {
        ...state,
        select: action.payload
      };
    default:
      return state;
  }
}
