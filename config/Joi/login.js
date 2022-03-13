const Joi = require("joi");

const LoginValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

module.exports = LoginValidator;
