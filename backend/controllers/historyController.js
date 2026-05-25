const ResumeHistory = require("../models/historyModel");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const getHistory = asyncHandler(async (req, res) => {
  const history = await ResumeHistory.find({ user: req.user._id })
    .populate("resume")
    .populate("analysis")
    .sort({ createdAt: -1 });

  return successResponse(res, 200, "Resume history fetched successfully", { history });
});

const getHistoryReport = asyncHandler(async (req, res) => {
  const report = await ResumeHistory.findOne({
    _id: req.params.id,
    user: req.user._id
  })
    .populate("resume")
    .populate("analysis");

  if (!report) {
    return res.status(404).json({ success: false, message: "History report not found" });
  }

  return successResponse(res, 200, "History report fetched successfully", { report });
});

const compareScores = asyncHandler(async (req, res) => {
  const history = await ResumeHistory.find({ user: req.user._id })
    .select("atsScore createdAt resume")
    .populate("resume", "originalName fileUrl")
    .sort({ createdAt: 1 });

  const comparison = history.map((item, index) => ({
    attempt: index + 1,
    historyId: item._id,
    resume: item.resume,
    atsScore: item.atsScore,
    createdAt: item.createdAt,
    changeFromPrevious: index === 0 ? 0 : item.atsScore - history[index - 1].atsScore
  }));

  return successResponse(res, 200, "Score comparison fetched successfully", { comparison });
});

module.exports = {
  getHistory,
  getHistoryReport,
  compareScores
};
