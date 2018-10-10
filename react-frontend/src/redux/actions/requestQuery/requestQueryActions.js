import axios from "axios";
import { notify } from "react-notify-toast";
import { errorNotify, successNotify } from "../../../utils/responseNotify";
import fileDownload from "js-file-download";

import {
  SET_EXECUTE,
  SET_DOWNLOADABLE,
  SET_INTERVAL,
  SET_QUERY_ARR,
  SET_URI_DATA,
  SET_REQUEST_QUERY_SELECT,
  SET_SELECTED_REQUEST_QUERY,
  SET_REQUEST_QUERY,
  SET_REQUEST_QUERY_OBJECT_TO_UNDEF
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
      errorNotify;
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

export const getRequestQueryForSelect = id => dispatch => {
  axios
    .get("/get-requestquery/select/datasetid/" + id)
    .then(res => {
      dispatch({
        type: SET_REQUEST_QUERY_SELECT,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string")
          notify.show(err.response.data, "error");
      }
      dispatch({
        type: SET_REQUEST_QUERY_SELECT,
        payload: []
      });
    });
};

export const setSelectedRequestQuerySelect = id => dispatch => {
  dispatch({
    type: SET_SELECTED_REQUEST_QUERY,
    payload: id
  });
};

export const getRequestQueryById = id => dispatch => {
  axios
    .get("/get-requestquery/" + id)
    .then(res => {
      dispatch({
        type: SET_REQUEST_QUERY,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string")
          notify.show(err.response.data, "error");
      }
    });
};

export const updateRequestQueryById = data => dispatch => {
  //put-requestquery/:id
  axios
    .put("/put-requestquery/" + data.id, data)
    .then(res => {
      if (typeof res.data === "string") {
        notify.show(res.data, "success");
      }
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string")
          notify.show(err.response.data, "error");
      }
    });
};

export const setSelectedRequestQueryToUndefined = data => dispatch => {
  dispatch({
    type: SET_REQUEST_QUERY_OBJECT_TO_UNDEF,
    payload: data
  });
};

export const downloadRequestQueryCollection = id => dispatch => {
  axios
    .get("/gridfs/collection-json/" + id, { responseType: "blob" })
    .then(res => {
      const filename = res.headers["content-disposition"].split("filename=")[1];
      fileDownload(res.data, filename);
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const removeRequestQueryById = id => dispatch => {
  axios
    .delete("/delete-requestquery/" + id)
    .then(res => {
      successNotify(res);
    })
    .catch(err => {
      errorNotify(err);
    });
};
