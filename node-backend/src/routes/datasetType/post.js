const router = require("express").Router();
const passport = require("passport");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const DatasetType = require("../../models/DatasetType").DatasetType;
const validateDatasetType = require("../../models/DatasetType")
  .validateDatasetType;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/post-datasettype/
// @desc Inserting new dataset type into mongo
// Private - Super User
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const { error } = validateDatasetType(req.body);
    if (error) return res.status(400).send(errorToJson(error));

    const datasetType = await DatasetType.findOne({ name: req.body.name });
    if (datasetType)
      return res.status(400).send(errorMsg.DATASETTYPE_ALREADY_EXISTS);

    const newDatasetType = new DatasetType({
      name: req.body.name
    });
    const saveDatasetType = await newDatasetType.save();
    if (saveDatasetType)
      return res.send(saveDatasetType.name + successMsg.WAS_SAVED);
  })
);

module.exports = router;
