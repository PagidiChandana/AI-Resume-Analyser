const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/userModel");

async function seedAdmin() {
  console.log("Starting administrative seeder & index cleanup...");
  
  if (!process.env.DB_URL) {
    console.error("❌ DB_URL is missing in your .env file!");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected successfully.");

    // Critical Index Cleanup: Drop obsolete 'username_1' index if it exists
    try {
      console.log("Cleaning up obsolete database indexes...");
      await User.collection.dropIndex("username_1");
      console.log("✅ Obsolete unique index 'username_1' dropped successfully.");
    } catch (err) {
      if (err.code === 27 || err.message.includes("index not found")) {
        console.log("ℹ️ Obsolete 'username_1' index already dropped or not present.");
      } else {
        console.warn("⚠️ Warning during index cleanup:", err.message);
      }
    }

    const defaultAdminEmail = "admin@analyzer.com";
    const defaultAdminPass = "adminpassword123";

    // 1. Check if user already exists
    let adminUser = await User.findOne({ email: defaultAdminEmail });

    if (adminUser) {
      console.log(`\nFound existing user with email ${defaultAdminEmail}.`);
      adminUser.role = "admin";
      await adminUser.save();
      console.log(`✅ Role upgraded successfully!`);
    } else {
      console.log(`\nCreating a fresh Administrator account...`);
      adminUser = await User.create({
        name: "System Administrator",
        email: defaultAdminEmail,
        password: defaultAdminPass, // Hashed automatically by userModel save pre-hook
        role: "admin"
      });
      console.log(`✅ Administrator account created successfully!`);
    }

    console.log(`\n==============================================`);
    console.log(`🔑 ADMIN LOGIN CREDENTIALS:`);
    console.log(`📧 Email:    ${defaultAdminEmail}`);
    console.log(`🔒 Password: ${defaultAdminPass}`);
    console.log(`🛡️  Role:     admin`);
    console.log(`==============================================`);
    console.log(`\nYou can now log in using these details to access the Admin Panel.`);
    
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seedAdmin();
