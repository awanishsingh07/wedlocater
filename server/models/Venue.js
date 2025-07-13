// server/models/Venue.js
const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  price: String,
});

module.exports = mongoose.model("Venue", venueSchema);
