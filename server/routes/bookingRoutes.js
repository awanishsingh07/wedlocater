const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { requireAuth, requireAdmin } = require("../middlewares/auth");

// ✅ 1. Book a Venue
router.post("/book", requireAuth, async (req, res) => {
  const { venueId, venueName } = req.body;
  const userEmail = req.user.email;

  try {
    const newBooking = await Booking.create({ userEmail, venueId, venueName });
    res.json({ status: "ok", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Booking failed" });
  }
});

// ✅ 2. Cancel Booking
router.delete("/bookings/:id", requireAuth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", message: "Booking cancelled" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Failed to cancel booking" });
  }
});

// ✅ 3. Get bookings for the logged-in user
router.get("/user", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email });
    res.json({ status: "ok", bookings });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch user bookings" });
  }
});

// ✅ 4. Get all bookings (Admin only)
router.get("/admin/bookings", requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ status: "ok", bookings });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch bookings" });
  }
});

// ❌ Legacy support (optional)
router.get("/my-bookings", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ status: "error", error: "Email required" });
  }

  try {
    const bookings = await Booking.find({ userEmail: email });
    res.json({ status: "ok", bookings });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Failed to fetch bookings" });
  }
});

module.exports = router;
