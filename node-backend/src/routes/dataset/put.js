const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");

const errorMiddleWare = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const errorToJson = require("../../models/helpers/errorToJson");

const successMsg = require("../../config/constants/success");

const Dataset = require("../../models/Dataset").Dataset;
const validateDataset = require("../../models/Dataset").validateDataset;

// @route PUT /api/put-dataset/id/:id
// @desc Updating a dataset by ID
// Private
router.put(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleWare(async (req, res) => {
    const { errors } = validateDataset(req.body);
    if (errors) return res.status(400).send(errorToJson(errors));
    console.log(req.params.id);
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const dataset = await Dataset.findOne({ _id: req.params.id });
      if (dataset) {
        const adminID = mongoose.Types.ObjectId(req.user._id);
        const createdByID = mongoose.Types.ObjectId(dataset.createdByID);
        if (req.user.isSuperUser || adminID.equals(createdByID)) {
          const updateDataset = {
            name: req.body.name,
            website: req.body.website,
            description: req.body.description,
            datasetType: req.body.datasetType
          };
          const datasetName = Dataset.findOne({ name: req.body.name });
          const nameID = mongoose.Types.ObjectId(datasetName._id);
          const datasetID = mongoose.Types.ObjectId(dataset._id);
          if (datasetName || nameID.equals(datasetID)) {
            updateDatasetById(datasetID, updateDataset);
          } else if (!datasetName) {
            updateDatasetById(datasetID, updateDataset);
          } else {
            return res
              .status(400)
              .send("Dataset with the provided name " + errorMsg.ALRADY_EXISTS);
          }
        } else {
          return res.status(403).send(errorMsg.FORBIDDEN);
        }
      } else {
        return res.status(404).send("Dataset " + errorMsg.NOT_FOUND);
      }
    }

    function updateDatasetById(id, updateDataset) {
      Dataset.findOneAndUpdate({ _id: id }, updateDataset, (err, updated) => {
        if (err) return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
        else return res.send(updated.name + successMsg.WAS_UPDATED);
      });
    }
  })
);

module.exports = router;
