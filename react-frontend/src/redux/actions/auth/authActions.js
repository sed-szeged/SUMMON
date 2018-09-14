import axios from "axios";
import { GET_ERRORS } from "../types";

// Register admin
export const registerAdmin = adminData => dispatch => {
  axios
    .post("/post-admin/")
    .then(res => {})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
