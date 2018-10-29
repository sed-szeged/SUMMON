import axios from "axios";
import {
  SET_GRIDFS_SELECT,
  SET_SELECTED_GRIDFS,
  SET_GRIDFS_NULL
} from "../types";
import { notify } from "react-notify-toast";
import { errorNotify, successNotify } from "../../../utils/responseNotify";
import fileDownload from "js-file-download";

export const uploadFile = (file, data) => dispatch => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  axios
    .post(
      "/gridfs/" +
        data.dataset +
        "?description=" +
        data.description +
        "&name=" +
        data.name,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${file._boundary}`
        },
        timeout: 30000,
        Authorization: localStorage.getItem("jwtToken")
      }
    )
    .then(res => {
      if (res.data) {
        if (typeof res.data === "string") notify.show(res.data, "success");
      }
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string") {
          notify.show(err.response.data, "error");
        } else {
          if (typeof err.response.data.name === "string")
            notify.show(err.response.data.name, "error");
          if (typeof err.response.data.description === "string")
            notify.show(err.response.data.description, "error");
        }
      }
    });
};

export const getGridFSForSelect = id => dispatch => {
  ///gridfs/select/id/:id
  axios
    .get("/gridfs/select/id/" + id)
    .then(res => {
      dispatch({
        type: SET_GRIDFS_SELECT,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        if (typeof err.response.data === "string") {
          notify.show(err.response.data, "error");
        }
      }
    });
};

export const setSelectedGridFS = id => dispatch => {
  dispatch({
    type: SET_SELECTED_GRIDFS,
    payload: id
  });
};

export const downloadGridFsFile = id => dispatch => {
  axios
    .get("/gridfs/file/" + id, { responseType: "blob" })
    .then(res => {
      const filename = res.headers["content-disposition"].split("filename=")[1];
      fileDownload(res.data, filename);
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const removeFile = id => dispatch => {
  axios
    .delete("/gridfs/file/" + id)
    .then(res => {
      successNotify(res);
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const setGridfsNull = () => dispatch => {
  dispatch({
    type: SET_GRIDFS_NULL
  });
};
