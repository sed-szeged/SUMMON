const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 75,
    required: true
  },
  country: {
    type: String,
    minlength: 3,
    maxlength: 75
  },
  location: {
    type: String,
    minlength: 3,
    maxlength: 128
  },
  website: {
    type: String,
    minlength: 3,
    maxlength: 128
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 255
  },
  created: {
    type: Date,
    default: Date.now()
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
  projectType: {
    type: String,
    required: true,
    default: "organization"
  }
});
function validateProject(project) {
  const JoiSchema = {
    name: Joi.string()
      .min(3)
      .max(75)
      .alphanum()
      .required(),
    country: Joi.string()
      .min(3)
      .max(75)
      .alphanum()
      .required(),
    location: Joi.string()
      .min(3)
      .max(128)
      .required(),
    website: Joi.string()
      .min(3)
      .max(128)
      .uri(),
    description: Joi.string()
      .min(10)
      .max(255),
    projectType: Joi.string()
      .valid("university", "organization", "smartcity")
      .required()
  };
  return Joi.validate(project, JoiSchema);
}

module.exports = {
  validateProject: validateProject,
  Project: mongoose.model("projects", ProjectSchema)
};
