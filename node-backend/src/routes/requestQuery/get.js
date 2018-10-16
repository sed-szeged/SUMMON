const router = require("express").Router();
const Id = require("valid-objectid");
const _ = require("lodash");
const mongoose = require("mongoose");
const mongoose_connection = mongoose.connection;

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const errorMsg = require("../../config/constants/errors");
const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const validateDate = require("../../models/RequestQuery").validateDate;

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

// @route GET /api/get-requestquery/:id/:date/:limit
// @desc GET array of reqeust query by id and query it's data by date and number of limit
// Public
router.get(
  "/:id/:date/:limit",
  errorMiddleware(async (req, res) => {
    let date, limit;
    try {
      limit = parseInt(req.params.limit);
    } catch (e) {
      return res.status(400).send(errorMsg.INVALID_REQUEST);
    }
    if (typeof limit !== "number") {
      limit = 10;
    } else {
      if (limit < 1 || 300 < limit) {
        limit = 300;
      } else {
        limit = Math.round(limit);
      }
    }
    const { error } = validateDate({ date: req.params.date });
    if (error) return req.status(400).send(errorMsg.INVALID_DATE_PARAMETER);
    else date = new Date(req.params.date);

    if (!Id.isValid(req.params.id)) {
      return req.status(400).send(errorMsg.INVALID_OBJECT_ID);
    } else {
      const rq = await RequestQuery.findOne({ _id: req.params.id });
      if (rq) {
        const n = Date.now();
        const now = new Date(n);
        const rq_date = new Date(rq.created);
        if (now.valueOf < date.valueOf) date = rq_date;
        if (date.valueOf < rq_date.valueOf) date = rq_date;
        mongoose_connection
          .collection(rq.collectionName)
          .find({
            date: { $gte: Date.parse(req.params.date) }
          })
          .limit(limit)
          .toArray((err, data) => {
            if (err)
              return res.status(400).send(errorMsg.INTERNAL_SERVER_ERROR);
            if (data.length === 0)
              return res.status(404).send(errorMsg.NOT_FOUND);
            else res.send({ data: data });
          });
      } else {
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID);
      }
    }
  })
);

module.exports = router;
