const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestQuerySchema = new Schema({
  name: {
    type: String,
    maxlength: 63,
    minlength: 3,
    required: true
  },
  queryURI: {
    type: String,
    maxlength: 512,
    required: true
  },
  execute: {
    type: Boolean,
    default: false,
    required: true
  },
  downloadable: {
    type: Boolean,
    default: false,
    required: true
  },
  interval: {
    type: String,
    enum: ["minute", "hour", "4hour", "6hour", "12hour", "daily"],
    required: true
  },
  queryArr: {
    type: Array,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
  dataset: { type: mongoose.Schema.Types.ObjectId, ref: "datasets" },
  collectionName: {
    type: String,
    required: true
  }
});

function validateRequestQuery(requestQuery) {
  const RequestQuerySchema = {
    name: Joi.string()
      .min(3)
      .max(63),
    queryURI: Joi.string()
      .uri()
      .max(512)
      .required(),
    execute: Joi.boolean().required(),
    downloadable: Joi.boolean().required(),
    interval: Joi.string().valid(
      "minute",
      "hour",
      "4hour",
      "6hour",
      "12hour",
      "daily"
    ),
    queryArr: Joi.array()
      .min(1)
      .max(10)
      .required(),
    dataset: Joi.string()
  };
  return Joi.validate(requestQuery, RequestQuerySchema);
}

function validateURI(uri) {
  const URISchema = {
    queryURI: Joi.string().uri()
  };
  return Joi.validate(uri, URISchema);
}

function makeCollectionName(name) {
  return "REQUEST_QUERY__" + name.split(" ").join("_") + Date.now();
}

module.exports = {
  validateURI: validateURI,
  validateRequestQuery: validateRequestQuery,
  RequestQuery: mongoose.model("requestqueries", RequestQuerySchema),
  makeCollectionName: makeCollectionName
};
