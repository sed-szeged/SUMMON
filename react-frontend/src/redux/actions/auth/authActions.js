import { notify } from "react-notify-toast";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_ADMIN } from "../types";

// Register admin
export const registerAdmin = adminData => dispatch => {
  axios
    .post("/post-admin/", adminData)
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

// Login - Get User token
export const loginAdmin = adminData => dispatch => {
  axios
    .post("/post-auth/", adminData)
    .then(res => {
      // Get token
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to set auth data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentAdmin(decoded));
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

export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete axios header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which set isAuthenticeted to false
  dispatch(setCurrentAdmin({}));
};
