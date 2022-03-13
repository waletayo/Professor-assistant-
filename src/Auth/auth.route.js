const express = require("express");

const router = express.Router();
const AuthController = require("./auth.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/compare",
  upload.fields([
    { name: "student_one_file", maxCount: 1 },
    { name: "student_two_file", maxCount: 1 },
  ]),
  AuthController.compareStudentEssay
);

export default router;
