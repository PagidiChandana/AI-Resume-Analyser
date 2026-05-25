const express = require("express");
const { uploadResume, getMyResumes } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/resume", protect, upload.single("resume"), uploadResume);
router.get("/resumes", protect, getMyResumes);

module.exports = router;
