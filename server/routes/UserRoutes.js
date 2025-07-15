const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.json({ status: "error", error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    res.json({ status: "ok", user });
  } catch (err) {
    res.json({ status: "error", error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ status: "error", error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1h" });

  res.json({
    status: "ok",
    token,
    role: user.role,
    name: user.name,
    email: user.email,
  });
});

// Get role
router.get("/user-role", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ status: "error", error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ status: "error", error: "User not found" });
    res.json({ status: "ok", role: user.role || "user" });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});

module.exports = router;
