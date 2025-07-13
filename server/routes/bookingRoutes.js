// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Booking model schema
const bookingSchema = new mongoose.Schema({
  userEmail: String,
  venueId: String,
  venueName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

// POST /api/book
router.post("/book", async (req, res) => {
  const { userEmail, venueId, venueName } = req.body;

  if (!userEmail || !venueId || !venueName) {
    return res.status(400).json({ status: "error", error: "Missing data" });
  }

  try {
    await Booking.create({ userEmail, venueId, venueName });
    res.json({ status: "ok", message: "Booking successful!" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

module.exports = router;
