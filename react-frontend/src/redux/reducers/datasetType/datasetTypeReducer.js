import { ADD_DATASETTYPE } from "../../actions/types";

const initialState = {
  datasetType: {}
};

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
