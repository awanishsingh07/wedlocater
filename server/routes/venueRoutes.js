// server/routes/venueRoutes.js
const express = require("express");
const Venue = require("../models/Venue");

const router = express.Router();

router.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json({ status: "ok", venues });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
