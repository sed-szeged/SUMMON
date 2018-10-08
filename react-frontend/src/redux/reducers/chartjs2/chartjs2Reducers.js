import { SET_CHART_TYPE } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHART_TYPE:
      return {
        ...state,
        selectedType: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
