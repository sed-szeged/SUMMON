const router = require("express").Router();
const Id = require("valid-objectid");
const _ = require("lodash");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const RequestQuery = require("../../models/RequestQuery").RequestQuery;

// @route GET /api/get-requestquery/:id
// @desc GET one Request Query
// Public
router.get(
  "/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const requestQuery = await RequestQuery.findById(req.params.id);
      if (requestQuery) {
        return res.send(requestQuery);
      } else {
        return res.status(404).send("Request Query " + errorMsg.NOT_FOUND);
      }
    }
  })
);

// @route GET /api/get-requestquery/select/datasetid/:id
// @desc GET all Request Queries by dataset id in "{ value: <val>, label: <lab> }"" format
// Private
router.get(
  "/select/datasetid/:id",
  errorMiddleware(async (req, res) => {
    if (!Id.isValid(req.params.id)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const requestQueriesArr = await RequestQuery.find({
        dataset: req.params.id
      });
      if (requestQueriesArr.length === 0) {
        return res.status(404).send("Request Queries" + errorMsg.NOT_FOUND);
      } else {
        let selectedRequestQueries = [];
        _.forEach(requestQueriesArr, rq => {
          selectedRequestQueries.push({ value: rq._id, label: rq.name });
        });
        return res.send(selectedRequestQueries);
      }
    }
  })
);

module.exports = router;
