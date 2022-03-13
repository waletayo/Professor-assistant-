const Joi = require("joi");

const EssayValidator = Joi.object({
  student_one_name: Joi.string().trim().required(),
  student_two_name: Joi.string().trim().required(),
});

module.exports = EssayValidator;
