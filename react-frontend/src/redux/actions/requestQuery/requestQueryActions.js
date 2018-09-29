import axios from "axios";
import { notify } from "react-notify-toast";

import {
  SET_EXECUTE,
  SET_DOWNLOADABLE,
  SET_INTERVAL,
  SET_QUERY_ARR,
  SET_URI_DATA
} from "../types";

export const setExecute = bool => dispatch => {
  dispatch({
    type: SET_EXECUTE,
    payload: bool
  });
};

export const setDownloadable = bool => dispatch => {
  dispatch({
    type: SET_DOWNLOADABLE,
    payload: bool
  });
};

export const setInterval = value => dispatch => {
  dispatch({
    type: SET_INTERVAL,
    payload: value
  });
};

export const setQueryArr = value => dispatch => {
  dispatch({
    type: SET_QUERY_ARR,
    payload: value
  });
};

export const getQueryUriData = uri => dispatch => {
  axios
    .post("/post-requestquery/queryuri", uri)
    .then(res => {
      dispatch({
        type: SET_URI_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      if (err)
        if (err.response)
          if (typeof err.response.data === "string")
            notify.show(err.response.data, "error");
    });
};

export const postNewRequestQuery = data => dispatch => {
  axios
    .post("/post-requestquery/", data)
    .then(res => {
      if (typeof res.data === "string") return notify.show(res.data, "success");
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string")
          return notify.show(err.response.data, "error");
        if (typeof err.response.data === "object") {
          if (err.response.data.name)
            return notify.show(err.response.data.name, "error");
          if (err.response.data.queryURI)
            return notify.show(err.response.data.queryURI, "error");
          if (err.response.data.execute)
            return notify.show(err.response.data.execute, "error");
          if (err.response.data.downloadable)
            return notify.show(err.response.data.downloadable, "error");
          if (err.response.data.interval)
            return notify.show(err.response.data.interval, "error");
          if (err.response.data.queryArr)
            return notify.show(err.response.data.queryArr, "error");
          if (err.response.data.dataset)
            return notify.show(err.response.data.dataset, "error");
        }
      }
    });
};
