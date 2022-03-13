const express = require("express");
const validator = require("../../config/validator");
const accountValidator = require("../../config/Joi/createAccount");
const loginValidator = require("../../config/Joi/login");

const router = express.Router();
const AuthController = require("./auth.controller");
router.post(
  "/create/account",
  validator(accountValidator),
  AuthController.CreateAccount
);
router.post("/login", validator(loginValidator), AuthController.login);
export default router;
