const router = require("express").Router();
const passport = require("passport");
const mongoose_connection = require("mongoose").connection;
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/delete-requestquery/:id
// @desc Create a new Request Query
// Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const rq = await RequestQuery.findOne({ _id: req.params.id });
      if (!rq) {
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
      } else {
        if (!req.user.isSuperUser) {
          return res.status(403).send(errorMsg.FORBIDDEN);
        } else {
          mongoose_connection.collection(rq.collectionName).drop();
          RequestQuery.deleteOne({ _id: req.params.id }, err => {
            return res.send("Request Query " + successMsg.WAS_REMOVED);
          });
        }
      }
    }
  })
);

module.exports = router;
