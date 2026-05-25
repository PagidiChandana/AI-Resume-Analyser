const express = require("express");
const {
  createAnalysis,
  getAnalysisById,
  analyzeSkillGap,
  recommendJobs
} = require("../controllers/analysisController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequiredFields } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/", protect, validateRequiredFields(["resumeId"]), createAnalysis);
router.get("/:id", protect, getAnalysisById);
router.post("/skill-gap", protect, validateRequiredFields(["resumeId", "targetRole"]), analyzeSkillGap);
router.post("/job-recommendations", protect, validateRequiredFields(["resumeId"]), recommendJobs);

module.exports = router;
