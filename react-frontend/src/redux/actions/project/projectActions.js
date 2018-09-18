import { GET_ERRORS } from "../types";
import { notify } from "react-notify-toast";
import axios from "axios";

export const projectAdd = projectData => dispatch => {
  axios
    .post("/post-project", projectData)
    .then(res => {
      if (typeof res.data === "string") {
        notify.show(res.data, "success");
      }
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      } else if (typeof err.response.data === "object") {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};
