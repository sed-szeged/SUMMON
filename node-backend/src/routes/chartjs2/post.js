const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorToJson = require("../../models/helpers/errorToJson");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");
const Dataset = require("../../models/Dataset").Dataset;
const Chartjs2 = require("../../models/Chartjs2").Chartjs2;
const validateChartjs2 = require("../../models/Chartjs2").validateChartjs2;

// @route POST /api/post-chartjs2/
// @desc Inserting new chart
// Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const { error } = validateChartjs2(req.body);
    if (error) return res.status(400).send(errorToJson(error));
    if (!Id.isValid(req.body.dataset)) {
      return res.status.send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const dataset = await Dataset.findById(req.body.dataset);
      if (!dataset) {
        return res.status.send("Dataset" + errorMsg.NOT_FOUND);
      } else {
        const newChartjs2 = new Chartjs2({
          name: req.body.name,
          description: req.body.description,
          chartType: req.body.chartType,
          createdBy: req.user._id,
          jsonData: req.body.jsonData,
          dataset: dataset._id
        });
        newChartjs2.save(err => {
          if (err) return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
          else return res.send("Chart" + successMsg.WAS_SAVED);
        });
      }
    }
  })
);

module.exports = router;
