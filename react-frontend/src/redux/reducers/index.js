import { combineReducers } from "redux";
import authReducer from "../reducers/auth/authReducer";
import errorsReducer from "../reducers/error/errorsReducer";
import datasetTypeReducer from "../reducers/datasetType/datasetTypeReducer";
import projectsReducer from "../reducers/project/projectsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  datasetType: datasetTypeReducer,
  projects: projectsReducer
});
