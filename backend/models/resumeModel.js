const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    originalName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String
    },
    fileType: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number
    },
    status: {
      type: String,
      enum: ["uploaded", "analyzed"],
      default: "uploaded"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
