const express = require("express");
const { getHistory, getHistoryReport, compareScores } = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getHistory);
router.get("/compare", protect, compareScores);
router.get("/:id", protect, getHistoryReport);

module.exports = router;
