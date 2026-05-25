const User = require("../models/userModel");
const Resume = require("../models/resumeModel");
const Analysis = require("../models/analysisModel");
const ResumeHistory = require("../models/historyModel");
const AdminStats = require("../models/adminStatsModel");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return successResponse(res, 200, "Users fetched successfully", { users });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await Promise.all([
    User.findByIdAndDelete(req.params.id),
    Resume.deleteMany({ user: req.params.id }),
    Analysis.deleteMany({ user: req.params.id }),
    ResumeHistory.deleteMany({ user: req.params.id })
  ]);

  return successResponse(res, 200, "User deleted successfully");
});

const getUploads = asyncHandler(async (req, res) => {
  const uploads = await Resume.find().populate("user", "name email").sort({ createdAt: -1 });
  return successResponse(res, 200, "Uploads fetched successfully", { uploads });
});

const getStatistics = asyncHandler(async (req, res) => {
  const [totalUsers, totalUploads, totalAnalyses, latestStats] = await Promise.all([
    User.countDocuments(),
    Resume.countDocuments(),
    Analysis.countDocuments(),
    AdminStats.findOne().sort({ updatedAt: -1 })
  ]);

  const stats = await AdminStats.findOneAndUpdate(
    {},
    {
      totalUsers,
      totalUploads,
      totalAnalyses,
      emailsSent: latestStats?.emailsSent || 0,
      lastCalculatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  return successResponse(res, 200, "Statistics fetched successfully", { stats });
});

const getAnalysisCount = asyncHandler(async (req, res) => {
  const count = await Analysis.countDocuments();
  return successResponse(res, 200, "Analysis count fetched successfully", { count });
});

module.exports = {
  getUsers,
  deleteUser,
  getUploads,
  getStatistics,
  getAnalysisCount
};
