// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ status: "error", error: "Access denied" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

// GET all bookings (Admin only)
router.get("/bookings", authMiddleware, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ status: "ok", bookings });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch bookings" });
  }
});

module.exports = router;
