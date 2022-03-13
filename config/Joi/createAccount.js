const Joi = require("joi");

const CreateAccountValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  name: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = CreateAccountValidator;
