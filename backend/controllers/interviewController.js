const Resume = require("../models/resumeModel");
const geminiService = require("../services/geminiService");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const generateQuestions = asyncHandler(async (req, res) => {
  const { resumeId, targetRole } = req.body;

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }

  const questions = await geminiService.generateInterviewQuestions({
    resumeUrl: resume.fileUrl,
    targetRole
  });

  return successResponse(res, 200, "Interview questions generated", questions);
});

module.exports = {
  generateQuestions
};
