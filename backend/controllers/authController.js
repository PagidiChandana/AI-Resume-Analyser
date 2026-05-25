const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id, user.role);

  return successResponse(res, 201, "User registered successfully", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = generateToken(user._id, user.role);

  return successResponse(res, 200, "Login successful", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  });
});

const getProfile = asyncHandler(async (req, res) => {
  return successResponse(res, 200, "Profile fetched successfully", { user: req.user });
});

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
