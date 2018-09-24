const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const Project = require("../../models/Project").Project;
const DatasetType = require("../../models/DatasetType").DatasetType;
const Dataset = require("../../models/Dataset").Dataset;
const validateDataset = require("../../models/Dataset").validateDataset;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/post-dataset/
// @desc Inserting new dataset into mongo
// Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const { error } = validateDataset(req.body);
    if (error) return res.status(400).send(errorToJson(error));

    if (!Id.isValid(req.body.project))
      return res.status(400).send("Project: " + errorMsg.INVALID_OBJECT_ID);
    if (!Id.isValid(req.body.datasetType))
      return res
        .status(400)
        .send("Dataset Type: " + errorMsg.INVALID_OBJECT_ID);

    const project = await Project.findById(req.body.project);
    const datasetType = await DatasetType.findById(req.body.datasetType);

    if (!project) {
      return res.status(404).send("Project " + errorMsg.NOT_FOUND);
    } else if (!datasetType) {
      return res.status(404).send("Dataset Type " + errorMsg.NOT_FOUND);
    } else if (project && datasetType) {
      const newDataset = new Dataset({
        name: req.body.name,
        website: req.body.website,
        description: req.body.description,
        project: project._id,
        datasetType: datasetType._id,
        createdBy: req.user._id
      });
      const addedDataset = await Dataset.findOne({
        name: newDataset.name,
        project: newDataset.project
      });
      if (addedDataset) {
        return res
          .status(400)
          .send("Dataset " + addedDataset.name + errorMsg.ALRADY_EXISTS);
      } else {
        newDataset.save((err, saved) => {
          if (err) return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
          else return res.send(newDataset.name + successMsg.WAS_SAVED);
        });
      }
    } else {
      return res.status(404).send(errorMsg.INTERNAL_SERVER_ERROR);
    }
  })
);

module.exports = router;
