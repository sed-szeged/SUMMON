const router = require("express").Router();

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const DatasetType = require("../../models/DatasetType").DatasetType;

const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route GET /api/get-datasettype/select/
// @desc GET all dataset type for select picker { value: "<_id>", label: "<name>" }
// Public
router.get(
  "/select/",
  errorMiddleware(async (req, res) => {
    const datasetTypes = await DatasetType.find();
    if (datasetTypes) {
      getSelectArray(datasetTypes).then(arr => {
        res.send(arr);
      });
    } else {
      return res.status(400).send("Dataset Type " + errorMsg.NOT_FOUND);
    }

    function getSelectArray(datasetTypes) {
      let datasetTypesArray = [];
      return new Promise((resolve, reject) => {
        datasetTypes.map(datasetType => {
          datasetTypesArray.push({
            value: datasetType._id,
            label: datasetType.name
          });
        });
        resolve(datasetTypesArray);
      });
    }
  })
);

module.exports = router;
