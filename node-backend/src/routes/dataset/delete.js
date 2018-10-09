const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const Dataset = require("../../models/Dataset").Dataset;
const Chartjs2 = require("../../models/Chartjs2").Chartjs2;
const RequestQuery = require("../../models/RequestQuery").RequestQuery;

const BUCKET_NAME = process.env.BUCKET_NAME; // || "gridfs_uploads";
const FILE_COLLECTION = BUCKET_NAME + ".files";

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route GET /api/delete-dataset/:id
// @desc remove a dataset by id
// Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
    }
    const dataset = Dataset.findOne({ _id: req.params.id });
    if (!dataset) {
      return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const gridfs = await mongoose.connection
        .collection(FILE_COLLECTION)
        .find({
          ["metadata.dataset"]: req.params.id
        })
        .toArray();
      const chart = await Chartjs2.findOne({ dataset: req.params.id });
      const requestQuery = await RequestQuery.findOne({
        dataset: req.params.id
      });

      const adminID = mongoose.Types.ObjectId(req.user._id);
      const datasetCreatedBy = mongoose.Types.ObjectId(dataset.createdBy);
      if (!req.user.isSuperUser && !adminID.equals(datasetCreatedBy)) {
        return res.status(403).send(errorMsg.FORBIDDEN);
      } else if (chart) {
        return res
          .status(400)
          .send("You must remove every chart to remove this dataset");
      } else if (requestQuery) {
        return res
          .status(400)
          .send("You must remove every requestQuery to remove this dataset");
      } else if (gridfs.length !== 0) {
        return res
          .status(400)
          .send("You must remove every GridFs to remove this dataset");
      } else {
        Dataset.deleteOne({ _id: req.params.id }, err => {
          if (err) {
            return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
          } else {
            return res.send("Dataset" + successMsg.WAS_REMOVED);
          }
        });
      }
    }
  })
);

module.exports = router;
