const router = require("express").Router();
const passport = require("passport");
const Id = require("valid-objectid");
const mongoose = require("mongoose");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");
const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const validateUpdateRequestQuery = require("../../models/RequestQuery")
  .validateUpdateRequestQuery;
const errorToJson = require("../../models/helpers/errorToJson");

// @route PUT /api/put-requestquery/:id
// @desc update a Request Query By ID
// Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const { error } = validateUpdateRequestQuery(req.body);
      if (error) return res.status(400).send(errorToJson(error));

      const requestQuery = await RequestQuery.findById(req.params.id);
      const userID = mongoose.Types.ObjectId(req.user._id);
      const requestQueryCreatedBy = mongoose.Types.ObjectId(
        requestQuery.createdBy
      );

      if (req.user.isSuperUser || userID.equals(requestQueryCreatedBy)) {
        const updateRequestQuery = {
          name: req.body.name,
          queryURI: req.body.queryURI,
          execute: req.body.execute,
          downloadable: req.body.downloadable,
          interval: req.body.interval,
          queryArr: req.body.queryArr
        };

        const updated = await RequestQuery.updateOne(
          { _id: req.params.id },
          updateRequestQuery
        );
        if (updated) {
          return res.send(successMsg.WAS_UPDATED);
        } else {
          return res.status(403).send(errorMsg.INTERNAL_SERVER_ERROR);
        }
      } else {
        return res.status(403).send(errorMsg.FORBIDDEN);
      }
    }
  })
);

module.exports = router;
