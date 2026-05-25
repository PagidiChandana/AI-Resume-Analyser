const mongoose = require("mongoose");

const adminStatsSchema = new mongoose.Schema(
  {
    totalUsers: { type: Number, default: 0 },
    totalUploads: { type: Number, default: 0 },
    totalAnalyses: { type: Number, default: 0 },
    emailsSent: { type: Number, default: 0 },
    lastCalculatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminStats", adminStatsSchema);
