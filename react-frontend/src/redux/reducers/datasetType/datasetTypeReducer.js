import { ADD_DATASETTYPE, SET_DATASETTYPE_SELECT } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DATASETTYPE:
      return {
        ...state,
        datasetType: action.payload
      };
    case SET_DATASETTYPE_SELECT:
      return {
        ...state,
        datasetTypeSelect: action.payload
      };
    default:
      return state;
  }
}
