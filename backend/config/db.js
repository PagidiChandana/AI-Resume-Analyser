const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is missing from environment variables");
  }

  const connection = await mongoose.connect(process.env.DB_URL);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
