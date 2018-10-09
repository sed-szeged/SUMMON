const router = require("express").Router();
const Id = require("valid-objectid");
const mongoose = require("mongoose");
const mongoose_connection = mongoose.connection;

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

const Dataset = require("../../models/Dataset").Dataset;
const Project = require("../../models/Project").Project;
const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const Chartjs2 = require("../../models/Chartjs2").Chartjs2;

const BUCKET_NAME = process.env.BUCKET_NAME;
const GRIDFS_COLLECTION = BUCKET_NAME + ".files";

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

// @route GET /api/get-dataset/list/:id
// @desc GET a dataset by ID
// Public
router.get(
  "/list/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const project = await Project.findById(req.params.id);
      if (!project || project.length === 0) {
        return res.status(404).send("Project by ID" + errorMsg.NOT_FOUND);
      } else {
        const datasets = await Dataset.find({
          project: req.params.id
        }).populate("datasetType");
        return res.send({ project, datasets });
      }
    }
  })
);

// @route GET /api/get-dataset/list-by-dataset/:id
// @desc GET a dataset and Chartjs & Gridfs &
// Public
router.get(
  "/list-by-dataset/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const dataset = await Dataset.findById(req.params.id).populate(
        "datasetType"
      );
      if (!dataset || dataset.length === 0) {
        return res.status(404).send("Dataset" + errorMsg.NOT_FOUND);
      } else {
        const requestQueries = await RequestQuery.find({
          dataset: req.params.id,
          downloadable: true
        });
        const chartjs2 = await Chartjs2.find({ dataset: req.params.id });
        const gridfs = await mongoose_connection
          .collection(GRIDFS_COLLECTION)
          .find({
            ["metadata.dataset"]: req.params.id
          })
          .toArray();
        return res.send({ dataset, requestQueries, chartjs2, gridfs });
      }
    }
  })
);

module.exports = router;
