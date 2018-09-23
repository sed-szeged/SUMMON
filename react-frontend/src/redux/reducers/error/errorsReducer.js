import { GET_ERRORS, SET_ERRORS_INITIAL_STATE } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case SET_ERRORS_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
}
