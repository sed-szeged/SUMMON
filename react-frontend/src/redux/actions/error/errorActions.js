import { SET_ERRORS_INITIAL_STATE } from "../types";

export const setErrorToInitialState = () => dispatch => {
  dispatch({
    type: SET_ERRORS_INITIAL_STATE
  });
};
