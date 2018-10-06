import axios from "axios";
import {} from "../types";
import { notify } from "react-notify-toast";

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
