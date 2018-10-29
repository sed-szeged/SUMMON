import axios from "axios";
import {
  SET_CHART_TYPE,
  SET_CHARTS_SELECT,
  SET_SELECTED_CHARTJS,
  SET_CHARTJS_DATA,
  SET_CHARTJS2_NULL
} from "../types";
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
      console.log(err.response);
      errorNotify(err);
    });
};

export const getChartsForSelect = id => dispatch => {
  axios
    .get("/get-chartjs2/select/datasetid/" + id)
    .then(res => {
      dispatch({
        type: SET_CHARTS_SELECT,
        payload: res.data
      });
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const setSelectedChartjs = id => dispatch => {
  dispatch({
    type: SET_SELECTED_CHARTJS,
    payload: id
  });
};

export const getChartJsById = id => dispatch => {
  axios
    .get("/get-chartjs2/" + id)
    .then(res => {
      dispatch({
        type: SET_CHARTJS_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const removeChartById = id => dispatch => {
  axios
    .delete("/delete-chartjs2/" + id)
    .then(res => {
      successNotify(res);
    })
    .catch(err => {
      errorNotify(err);
    });
};

export const setChartjs2Null = () => dispatch => {
  dispatch({ type: SET_CHARTJS2_NULL });
};
