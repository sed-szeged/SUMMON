import { combineReducers } from "redux";
import authReducer from "../reducers/auth/authReducer";
import errorsReducer from "../reducers/error/errorsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer
});
