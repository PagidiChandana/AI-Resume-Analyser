const Analysis = require("../models/analysisModel");
const Resume = require("../models/resumeModel");
const ResumeHistory = require("../models/historyModel");
const AdminStats = require("../models/adminStatsModel");
const geminiService = require("../services/geminiService");
const { sendAnalysisReport } = require("../services/emailService");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const createAnalysis = asyncHandler(async (req, res) => {
  const { resumeId, targetRole, jobDescription, sendEmail } = req.body;

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }

  const aiReport = await geminiService.analyzeResume({
    resumeUrl: resume.fileUrl,
    targetRole,
    jobDescription
  });

  const analysis = await Analysis.create({
    user: req.user._id,
    resume: resume._id,
    targetRole,
    jobDescription,
    atsScore: aiReport.atsScore,
    atsBreakdown: aiReport.atsBreakdown,
    resumeQuality: aiReport.resumeQuality,
    atsCompatibility: aiReport.atsCompatibility,
    skills: aiReport.skills,
    missingSections: aiReport.missingSections,
    formattingFeedback: aiReport.formattingFeedback,
    strengths: aiReport.strengths,
    weaknesses: aiReport.weaknesses,
    suggestions: aiReport.suggestions,
    skillGap: aiReport.skillGap,
    jobRecommendations: aiReport.jobRecommendations,
    rawResponse: aiReport
  });

  await Promise.all([
    Resume.findByIdAndUpdate(resume._id, { status: "analyzed" }),
    ResumeHistory.create({
      user: req.user._id,
      resume: resume._id,
      analysis: analysis._id,
      atsScore: analysis.atsScore,
      summary: aiReport.summary
    }),
    AdminStats.findOneAndUpdate(
      {},
      { $inc: { totalAnalyses: 1 }, $set: { lastCalculatedAt: new Date() } },
      { upsert: true, new: true }
    )
  ]);

  if (sendEmail) {
    await sendAnalysisReport({
      to: req.user.email,
      name: req.user.name,
      analysis
    });
  }

  return successResponse(res, 201, "Resume analysis completed", { analysis });
});

const getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate("resume");

  if (!analysis) {
    return res.status(404).json({ success: false, message: "Analysis not found" });
  }

  return successResponse(res, 200, "Analysis fetched successfully", { analysis });
});

const analyzeSkillGap = asyncHandler(async (req, res) => {
  const { resumeId, targetRole } = req.body;

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }

  const skillGap = await geminiService.analyzeSkillGap({
    resumeUrl: resume.fileUrl,
    targetRole
  });

  return successResponse(res, 200, "Skill gap analysis completed", { skillGap });
});

const recommendJobs = asyncHandler(async (req, res) => {
  const { resumeId } = req.body;

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    return res.status(404).json({ success: false, message: "Resume not found" });
  }

  const recommendations = await geminiService.recommendJobs({ resumeUrl: resume.fileUrl });
  return successResponse(res, 200, "Job recommendations generated", recommendations);
});

module.exports = {
  createAnalysis,
  getAnalysisById,
  analyzeSkillGap,
  recommendJobs
};
