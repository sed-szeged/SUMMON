const router = require("express").Router();
const Id = require("valid-objectid");
const passport = require("passport");
const mongoose = require("mongoose");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");
const Chartjs2 = require("../../models/Chartjs2").Chartjs2;

// @route GET /api/delete-chartjs2/:id
// @desc Remove chartjs by id
// Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const chartjs = await Chartjs2.findOne({ _id: req.params.id });
      if (!chartjs) {
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        const adminID = mongoose.Types.ObjectId(req.user._id);
        const Chartjs2CreatedBy = mongoose.Types.ObjectId(chartjs._id);
        if (!req.user.isSuperUser && !adminID.equals(Chartjs2CreatedBy)) {
          return res.status(403).send(errorMsg.FORBIDDEN);
        } else {
          Chartjs2.deleteOne({ _id: chartjs._id }, err => {
            if (err)
              return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
            else return res.send(successMsg.WAS_REMOVED);
          });
        }
      }
    }
  })
);

module.exports = router;
