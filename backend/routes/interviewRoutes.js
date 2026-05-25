const express = require("express");
const { generateQuestions } = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequiredFields } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/questions", protect, validateRequiredFields(["resumeId"]), generateQuestions);

module.exports = router;
