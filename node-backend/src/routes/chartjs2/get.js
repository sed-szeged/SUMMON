const router = require("express").Router();
const Id = require("valid-objectid");
const mongoose = require("mongoose");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");
const Dataset = require("../../models/Dataset").Dataset;
const Chartjs2 = require("../../models/Chartjs2").Chartjs2;
const validateChartjs2 = require("../../models/Chartjs2").validateChartjs2;

// @route GET /api/get-chartjs2/select/datasetid/:id
// @desc Get ChartJS for select by dataset ID
// Public
router.get(
  "/select/datasetid/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const dataset = await Dataset.find({ _id: req.params.id });
      if (!dataset || dataset.length === 0) {
        return res
          .status(400)
          .send(errorMsg.INVALID_OBJECT_ID + " for Dataset");
      } else {
        const chartjs2 = await Chartjs2.find({ dataset: req.params.id });
        if (!chartjs2 || chartjs2.length !== 0) {
          getDataForSelect(chartjs2).then(arr => {
            return res.send(arr);
          });
        } else {
          return res.status(404).send("Charts " + errorMsg.NOT_FOUND);
        }
      }
    }

    function getDataForSelect(chartjsArr) {
      arr = [];
      return new Promise((resolve, reject) => {
        chartjsArr.forEach(chartjsItem => {
          arr.push({ value: chartjsItem._id, label: chartjsItem.name });
        });
        resolve(arr);
      });
    }
  })
);

// @route GET /api/get-chartjs2/:id
// @desc Get a single Chartjs data
// Public
router.get(
  "/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const chartjs = await Chartjs2.findById(req.params.id);
      if (!chartjs) {
        return res.status(404).send("Chart " + errorMsg.NOT_FOUND);
      } else {
        res.send(chartjs);
      }
    }
  })
);

module.exports = router;
