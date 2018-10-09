const router = require("express").Router();
const passport = require("passport");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const DatasetType = require("../../models/DatasetType").DatasetType;
const validateDatasetType = require("../../models/DatasetType")
  .validateDatasetType;
const Dataset = require("../../models/Dataset").Dataset;
const Id = require("valid-objectid");

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/delete-datasettype/:id
// @desc Remove a datasettype by id
// Private - Super User
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const datasetType = await DatasetType.findOne({ _id: req.params.id });
      if (!datasetType) {
        return res.status(404).send("Dataset Type" + errorMsg.NOT_FOUND);
      } else {
        const dataset = await Dataset.findOne({ datasetType: req.params.id });
        if (dataset) {
          return res
            .status(400)
            .send("You must remove all datasets to remove this type");
        } else {
          DatasetType.remove({ _id: req.params.id }, err => {
            if (err)
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            else return res.send("Dataset Type" + successMsg.WAS_REMOVED);
          });
        }
      }
    }
  })
);

module.exports = router;
