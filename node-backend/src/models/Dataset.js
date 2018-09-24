const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatasetSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 127,
    required: true
  },
  website: {
    type: String,
    maxlength: 511,
    required: false
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 255,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "projects" },
  datasetType: { type: mongoose.Schema.Types.ObjectId, ref: "datasetTypes" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" }
});

function validateDataset(dataset) {
  const JoiSchema = {
    name: Joi.string()
      .min(3)
      .max(127)
      .required(),
    website: Joi.string()
      .max(511)
      .uri(),
    description: Joi.string()
      .min(10)
      .max(255),
    project: Joi.string(),
    datasetType: Joi.string()
  };
  return Joi.validate(dataset, JoiSchema);
}

module.exports = {
  Dataset: mongoose.model("datasets", DatasetSchema),
  validateDataset: validateDataset
};
