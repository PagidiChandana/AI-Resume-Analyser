const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("../config/db");
const errorMiddleware = require("../middleware/errorMiddleware");

dotenv.config();

// Set NODE_ENV to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const authRoutes = require("../routes/authRoutes");
const uploadRoutes = require("../routes/uploadRoutes");
const analysisRoutes = require("../routes/analysisRoutes");
const interviewRoutes = require("../routes/interviewRoutes");
const historyRoutes = require("../routes/historyRoutes");
const adminRoutes = require("../routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Analyzer API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

startServer();
