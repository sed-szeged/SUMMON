const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chartjs2Schema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 64
  },
  description: {
    type: String,
    maxlength: 500
  },
  chartType: {
    type: String,
    enum: ["line", "bar", "doughnut"]
  },
  jsonData: {
    type: Object
  },
  dataset: { type: mongoose.Schema.Types.ObjectId, ref: "datasets" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
  created: {
    type: Date,
    default: Date.now()
  }
});

function validateChartjs2(chartjs2Type) {
  const JoiSchema = {
    name: Joi.string()
      .min(3)
      .max(64)
      .alphanum()
      .required(),
    description: Joi.string().max(500),
    chartType: Joi.string()
      .valid("line", "bar", "doughnut")
      .required(),
    jsonData: Joi.object().required(),
    dataset: Joi.string().required()
  };
  return Joi.validate(chartjs2Type, JoiSchema);
}

module.exports = {
  validateChartjs2: validateChartjs2,
  Chartjs2: mongoose.model("chartjs2", Chartjs2Schema)
};
