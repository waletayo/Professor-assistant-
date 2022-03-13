const express = require("express");
const validator = require("../../config/validator");
const validateAccessToken = require("../../utils/verify-token");
const router = express.Router();
const AuthController = require("./essay.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const essayValidator = require("../../config/Joi/compareEssay");

router.post(
  "/compare",
  upload.fields([
    { name: "student_one_file", maxCount: 1 },
    { name: "student_two_file", maxCount: 1 },
  ]),
  validator(essayValidator),
  validateAccessToken,
  AuthController.compareStudentEssay
);
router.post("/retry", validateAccessToken, AuthController.reTryEssayComparison);
router.get("/details", validateAccessToken, AuthController.findOneEssay);
router.get("/history", validateAccessToken, AuthController.History);
export default router;
