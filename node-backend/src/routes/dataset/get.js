const router = require("express").Router();
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

const Dataset = require("../../models/Dataset").Dataset;

// @route GET /api/get-dataset/id/:id
// @desc GET a dataset by ID
// Public
router.get(
  "/id/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const dataset = await Dataset.findById(req.params.id);
      if (dataset) {
        return res.send(dataset);
      } else {
        return res.status(404).send("Dataset " + errorMsg.NOT_FOUND);
      }
    }
  })
);

// @route GET /api/get-dataset/select/id/:id
// @desc GET all datasets by project ID in "{ value: <val>, label: <lab> }"" format
// Public
router.get(
  "/select/id/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const datasets = await Dataset.find({ project: req.params.id });
      getDatasetArr(datasets)
        .then(arr => {
          res.send(arr);
        })
        .catch(err => {
          res.status(404).send(err);
        });
    }

    function getDatasetArr(datasets) {
      let arr = [];
      return new Promise((resolve, reject) => {
        if (datasets.length === 0) reject("Datasets " + errorMsg.NOT_FOUND);
        datasets.map(dataset => {
          arr.push({ value: dataset._id, label: dataset.name });
        });
        resolve(arr);
      });
    }
  })
);

module.exports = router;
