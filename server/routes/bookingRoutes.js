const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { requireAdmin } = require("../middlewares/auth");

// Get bookings by user email
router.get("/my-bookings", async (req, res) => {
  const { email } = req.query;
  if (!email)
    return res.status(400).json({ status: "error", error: "Email required" });

  try {
    const bookings = await Booking.find({ userEmail: email });
    res.json({ status: "ok", bookings });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch bookings" });
  }
});

router.post("/book", async (req, res) => {
  const { userEmail, venueId, venueName } = req.body;

  try {
    console.log("📥 Booking request received:", req.body);

    await Booking.create({ userEmail, venueId, venueName });

    console.log("✅ Booking saved!");
    res.json({ status: "ok" });
  } catch (err) {
    console.error("❌ Booking failed:", err.message);
    res.json({ status: "error", error: err.message });
  }
});

// Cancel booking by ID
router.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", message: "Booking cancelled" });
  } catch (err) {
    res.json({ status: "error", error: "Failed to cancel booking" });
  }
});

// Get all bookings - Admin use
router.get("/admin/bookings", requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ status: "ok", bookings });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch bookings" });
  }
});

module.exports = router;
