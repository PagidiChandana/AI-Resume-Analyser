const mongoose = require("mongoose");

const atsBreakdownSchema = new mongoose.Schema(
  {
    skills: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    formatting: { type: Number, default: 0 }
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
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
      required: true,
      index: true
    },
    targetRole: {
      type: String,
      trim: true
    },
    jobDescription: {
      type: String,
      trim: true
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    atsBreakdown: {
      type: atsBreakdownSchema,
      default: () => ({})
    },
    resumeQuality: String,
    atsCompatibility: String,
    skills: [String],
    missingSections: [String],
    formattingFeedback: [String],
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
    skillGap: {
      missingSkills: [String],
      recommendedSkills: [String],
      learningSuggestions: [String]
    },
    jobRecommendations: [
      {
        jobTitle: String,
        requiredSkills: [String],
        suitabilityPercentage: Number
      }
    ],
    rawResponse: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
