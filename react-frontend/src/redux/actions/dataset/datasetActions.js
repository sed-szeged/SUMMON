import {
  GET_ERRORS,
  SET_DATASET_SELECT,
  SET_DATASET,
  SET_SELECTED_DATASET
} from "../types";
import { notify } from "react-notify-toast";
import axios from "axios";

export const getDatasetById = id => dispatch => {
  axios
    .get("/get-dataset/id/" + id)
    .then(res => {
      dispatch({
        type: SET_DATASET,
        payload: res.data
      });
    })
    .then(err => {
      if (err)
        if (err.response)
          if (typeof err.response.data === "string")
            notify.show(err.response.data, "success");
    });
};

export const datasetAdd = dataset => dispatch => {
  axios
    .post("/post-dataset/", dataset)
    .then(res => {
      if (typeof res.data === "string") notify.show(res.data, "success");
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

export const datasetForSelectByProjectId = id => dispatch => {
  axios
    .get("/get-dataset/select/id/" + id)
    .then(res => {
      dispatch({ type: SET_DATASET_SELECT, payload: res.data });
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

export const updateDatasetById = (id, dataset) => dispatch => {
  axios
    .put("/put-dataset/id/" + id, dataset)
    .then(res => {
      if (typeof res.data === "string") notify.show(res.data, "success");
      datasetForSelectByProjectId(id);
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

export const setSelectedDatasetId = id => dispatch => {
  dispatch({
    type: SET_SELECTED_DATASET,
    payload: id
  });
};
