import { GET_ERRORS } from "../../actions/types";

const initialState = {
  isAuthenticated: false,
  admin: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "":
      return {
        ...state,
        admin: action.payload
      };
    default:
      return state;
  }
}
