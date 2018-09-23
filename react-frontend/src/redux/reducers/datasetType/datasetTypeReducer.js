import { ADD_DATASETTYPE, DATASETTYPE_FOR_SELECT } from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DATASETTYPE:
      return {
        ...state,
        datasetType: action.payload
      };
    default:
      return state;
  }
}
