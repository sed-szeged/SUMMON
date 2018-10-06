const Joi = require("joi");

function validateGridFS(gridfs) {
  const JoiSchema = {
    description: Joi.string().max(500),
    name: Joi.string()
      .min(3)
      .max(63)
  };
  return Joi.validate(gridfs, JoiSchema);
}

module.exports = {
  validateGridFS
};
