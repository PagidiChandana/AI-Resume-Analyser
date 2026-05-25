const express = require("express");
const {
  getUsers,
  deleteUser,
  getUploads,
  getStatistics,
  getAnalysisCount
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.get("/uploads", getUploads);
router.get("/statistics", getStatistics);
router.get("/analysis-count", getAnalysisCount);

module.exports = router;
