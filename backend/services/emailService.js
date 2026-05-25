const nodemailer = require("nodemailer");
const AdminStats = require("../models/adminStatsModel");

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("[Email Service] Warning: EMAIL_USER or EMAIL_PASS is missing. Email features will be disabled.");
    return null;
  }

  try {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (err) {
    console.error("[Email Service] Failed to create email transporter:", err.message);
    return null;
  }
};

const sendAnalysisReport = async ({ to, name, analysis }) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[Email Service] Skipper: SMTP Transporter is not configured. Email not sent.");
    return;
  }

  try {
    const suggestions = (analysis.suggestions || []).map((item) => `<li>${item}</li>`).join("");

    await transporter.sendMail({
      from: `"AI Resume Analyzer" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your AI Resume Analysis Report",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your resume analysis is ready.</p>
        <p><strong>ATS Score:</strong> ${analysis.atsScore}/100</p>
        <p><strong>Resume Quality:</strong> ${analysis.resumeQuality || "Reviewed"}</p>
        <h3>Suggestions</h3>
        <ul>${suggestions}</ul>
      `
    });

    console.log(`[Email Service] Analysis email successfully sent to: ${to}`);

    await AdminStats.findOneAndUpdate(
      {},
      { $inc: { emailsSent: 1 }, $set: { lastCalculatedAt: new Date() } },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error(`[Email Service] Failed to send email to ${to}:`, error.message);
    // Gracefully catch and absorb email errors so the core analysis flow is not disrupted
  }
};

module.exports = {
  sendAnalysisReport
};

