const mongoose = require("mongoose");

const resumeHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },
    analysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      required: true
    },
    atsScore: {
      type: Number,
      required: true
    },
    summary: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeHistory", resumeHistorySchema);
