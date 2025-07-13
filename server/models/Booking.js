const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  venueId: { type: String, required: true },
  venueName: { type: String, required: true },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
