import {
  SET_CHART_TYPE,
  SET_CHARTS_SELECT,
  SET_SELECTED_CHARTJS,
  SET_CHARTJS_DATA,
  SET_CHARTJS2_NULL
} from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHART_TYPE:
      return {
        ...state,
        selectedType: action.payload
      };
    case SET_CHARTS_SELECT:
      return {
        ...state,
        select: action.payload
      };
    case SET_SELECTED_CHARTJS:
      return {
        ...state,
        selected: action.payload
      };
    case SET_CHARTJS_DATA:
      return {
        ...state,
        chart: action.payload
      };
    case SET_CHARTJS2_NULL:
      return null;
    default:
      return {
        ...state
      };
  }
}
