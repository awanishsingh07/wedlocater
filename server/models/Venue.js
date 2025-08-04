const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  pricePerDay: Number,
  description: String,
  imageUrl: String,
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
