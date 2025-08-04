// server/routes/venueRoutes.js
const express = require("express");
const Venue = require("../models/Venue");

const router = express.Router();

// ✅ Route 1: Get all venues
router.get("/all", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json({ status: "ok", venues });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// ✅ Route 2: Seed a sample venue
router.get("/seed", async (req, res) => {
  // Use GET for easy browser testing
  try {
    const sampleVenue = new Venue({
      name: "Royal Palace",
      location: "Bhopal",
      pricePerDay: 50000,
      description: "Elegant wedding venue with royal decor.",
      imageUrl: "https://source.unsplash.com/featured/?wedding,venue",
    });

    await sampleVenue.save();
    res.json({ message: "Venue added!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding venue");
  }
});

module.exports = router;
