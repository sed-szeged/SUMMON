import { notify } from "react-notify-toast";

export const errorNotify = err => {
  if (err.response) {
    if (err.response.data) {
      if (typeof err.response.data === "string") {
        notify.show(err.response.data, "error");
      }
      if (typeof err.response.data === "object") {
        if (typeof err.response.data[0] === "string") {
          notify.show(err.response.data[0], "error");
        } else {
          const msg = Object.keys(err.response.data)[0];
          notify.show(JSON.stringify(err.response.data[msg]), "error");
        }
      }
    }
  }
};

export const successNotify = res => {
  if (res.data) {
    if (typeof res.data === "string") {
      notify.show(res.data, "success");
    }
  }
};
