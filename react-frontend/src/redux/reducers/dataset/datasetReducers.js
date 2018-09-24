import { SET_DATASET_SELECT, SET_DATASET } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATASET:
      return {
        ...state,
        dataset: action.payload
      };
    case SET_DATASET_SELECT:
      return {
        ...state,
        select: action.payload
      };
    default:
      return { ...state };
  }
}
