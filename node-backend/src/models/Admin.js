const Joi = require("joi");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    maxlength: 510
  },
  isSuperUser: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

function validateAdmin(admin) {
  const joiSchema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(4)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(64)
      .required()
      .alphanum(),
    isSuperUser: Joi.boolean(),
    confirmPassword: Joi.string()
      .min(6)
      .max(64)
      .required()
      .alphanum()
  };
  try {
    return Joi.validate(admin, joiSchema);
  } catch (e) {
    console.log("catches");
  }
}

module.exports = {
  Admin: mongoose.model("admins", AdminSchema),
  validateAdmin: validateAdmin
};
