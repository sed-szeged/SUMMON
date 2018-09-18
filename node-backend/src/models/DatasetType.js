const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatasetTypeSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 25
  }
});

function validateDatasetType(datasetType) {
  const JoiSchema = {
    name: Joi.string()
      .min(3)
      .max(25)
      .alphanum()
      .required()
  };
  return Joi.validate(datasetType, JoiSchema);
}

module.exports = {
  validateDatasetType: validateDatasetType,
  DatasetType: mongoose.model("datasetTypes", DatasetTypeSchema)
};
