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
    minlength: 2,
    maxlength: 75
  },
  location: {
    type: String,
    minlength: 2,
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
    maxlength: 1020
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
      .required(),
    country: Joi.string()
      .min(2)
      .max(75)
      .required(),
    location: Joi.string()
      .min(2)
      .max(128)
      .required(),
    website: Joi.string()
      .min(3)
      .max(128)
      .uri(),
    description: Joi.string()
      .min(10)
      .max(1020),
    projectType: Joi.string()
      .valid("university", "organization", "smartcity")
      .required()
  };
  return Joi.validate(project, JoiSchema);
}

function validateProjectType(project_Type) {
  const JoiSchema = {
    type: Joi.string()
      .valid("university", "organization", "smartcity")
      .required()
  };
  return Joi.validate(project_Type, JoiSchema);
}

module.exports = {
  validateProject: validateProject,
  Project: mongoose.model("projects", ProjectSchema),
  validateProjectType: validateProjectType
};
