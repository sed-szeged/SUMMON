import { SET_GRIDFS_SELECT, SET_SELECTED_GRIDFS } from "../../actions/types";

const initialState = {
  select: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GRIDFS_SELECT:
      return {
        ...state,
        select: action.payload
      };
    case SET_SELECTED_GRIDFS:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
