import { GET_ERRORS, SET_DATASETTYPE_SELECT } from "../types";
import { notify } from "react-notify-toast";
import axios from "axios";

export const datasetTypeAdd = datasetTypeData => dispatch => {
  axios
    .post("/post-datasettype", datasetTypeData)
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

export const getDatasetTypesForSelect = () => dispatch => {
  axios
    .get("/get-datasettype/select/")
    .then(res => {
      if (res.data) {
        dispatch({
          type: SET_DATASETTYPE_SELECT,
          payload: res.data
        });
      }
    })
    .catch(err => {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      }
    });
};
