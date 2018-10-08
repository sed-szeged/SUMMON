import axios from "axios";
import { SET_CHART_TYPE } from "../types";
import { errorNotify, successNotify } from "../../../utils/responseNotify";

export const setChartType = type => dispatch => {
  dispatch({
    type: SET_CHART_TYPE,
    payload: type
  });
};

export const postChartJs = data => dispatch => {
  axios
    .post("/post-chartjs2/", data)
    .then(res => {
      successNotify(res);
    })
    .catch(err => {
      errorNotify(err);
    });
};
