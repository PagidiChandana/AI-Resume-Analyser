const Resume = require("../models/resumeModel");
const AdminStats = require("../models/adminStatsModel");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Resume file is required" });
  }

  const resume = await Resume.create({
    user: req.user._id,
    originalName: req.file.originalname,
    fileUrl: req.file.path,
    publicId: req.file.filename,
    fileType: req.file.mimetype,
    fileSize: req.file.size
  });

  await AdminStats.findOneAndUpdate(
    {},
    { $inc: { totalUploads: 1 }, $set: { lastCalculatedAt: new Date() } },
    { upsert: true, new: true }
  );

  return successResponse(res, 201, "Resume uploaded successfully", { resume });
});

const getMyResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  return successResponse(res, 200, "Resumes fetched successfully", { resumes });
});

module.exports = {
  uploadResume,
  getMyResumes
};
