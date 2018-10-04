const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");
const Id = require("valid-objectid");

const errorMiddleware = require("../../middlewares/error/errorMiddleWare");
const validateURI = require("../../models/RequestQuery").validateURI;
const validateRequestQuery = require("../../models/RequestQuery")
  .validateRequestQuery;
const RequestQuery = require("../../models/RequestQuery").RequestQuery;
const Dataset = require("../../models/Dataset").Dataset;
const makeCollectionName = require("../../models/RequestQuery")
  .makeCollectionName;
const errorToJson = require("../../models/helpers/errorToJson");
const errorMsg = require("../../config/constants/errors");
const successMsg = require("../../config/constants/success");

// @route POST /api/post-requestquery/
// @desc Create a new Request Query
// Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  errorMiddleware(async (req, res) => {
    const { error } = validateRequestQuery(req.body);
    if (error) return res.status(400).send(errorToJson(error));

    if (!Id.isValid(req.body.dataset)) {
      return res.status(400).send(errorMsg.INVALID_OBJECT_ID + " - Dataset");
    } else {
      const dataset = await Dataset.findById(req.body.dataset);
      if (!dataset)
        return res.status(404).send(errorMsg.INVALID_OBJECT_ID + " - Dataset");

      const requestQuery = await RequestQuery.findOne({
        name: req.body.name,
        dataset: req.body.dataset
      });

      if (requestQuery) {
        return res
          .status(400)
          .send(
            "Request Query with the provided name and Dataset " +
              errorMsg.ALRADY_EXISTS
          );
      } else {
        const newRequestQuery = new RequestQuery({
          name: req.body.name,
          queryURI: req.body.queryURI,
          execute: req.body.execute,
          downloadable: req.body.downloadable,
          interval: req.body.interval,
          dataset: dataset._id,
          createdBy: req.user._id,
          queryArr: req.body.queryArr,
          collectionName: makeCollectionName(req.body.name)
        });
        const savedRequestQuery = await newRequestQuery.save();
        if (savedRequestQuery)
          return res.send("Request Query " + successMsg.WAS_SAVED);
        else return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR + " 2");
      }
    }
  })
);

// @route POST /api/post-requestquery/queryuri
// @desc get data from query URI
// Private
router.post(
  "/queryuri",
  // passport.authenticate("jwt", { session: false }),
  errorMiddleware((req, res) => {
    const { error } = validateURI(req.body);
    if (error) return res.status(400).send(errorToJson(error));
    const { queryURI } = req.body;
    axios
      .get(queryURI)
      .then(response => {
        return res.send(response.data);
      })
      .catch(err => {
        return res.status(500).send(errorMsg.INTERNAL_SERVER_ERROR);
      });
  })
);

module.exports = router;
