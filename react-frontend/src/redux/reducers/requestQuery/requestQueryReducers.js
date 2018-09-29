import {
  SET_EXECUTE,
  SET_DOWNLOADABLE,
  SET_INTERVAL,
  SET_QUERY_ARR,
  SET_URI_DATA
} from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_EXECUTE:
      return {
        ...state,
        execute: action.payload
      };
    case SET_DOWNLOADABLE:
      return {
        ...state,
        downloadable: action.payload
      };
    case SET_INTERVAL:
      return {
        ...state,
        interval: action.payload
      };
    case SET_QUERY_ARR:
      return {
        ...state,
        queryArr: action.payload
      };
    case SET_URI_DATA:
      return {
        ...state,
        json: action.payload
      };
    default:
      return state;
  }
}
