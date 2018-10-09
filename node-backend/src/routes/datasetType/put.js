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

// @route POST /api/put-datasettype/:id
// @desc Update a dataset type
// Private - Super User
router.put(
  "/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const datasetType = await DatasetType.findOne({ _id: req.params.id });
      if (!datasetType) {
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const sameName = await DatasetType.findOne({ name: req.body.name });
        if (sameName) {
          return res
            .status(400)
            .send(errorMsg.INVALID_REQUEST + " type alrady exists");
        } else {
          const { error } = validateDatasetType(req.body);
          if (error) {
            return res.status(400).send(errorToJson(error));
          } else {
            DatasetType.updateOne(
              { _id: req.params.id },
              { name: req.body.name },
              err => {
                return res.send("Dataset Type" + successMsg.WAS_UPDATED);
              }
            );
          }
        }
      }
    }
  })
);

module.exports = router;
