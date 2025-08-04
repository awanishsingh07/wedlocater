// Load environment variables from .env
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db"); // ✅ Your DB connection function
const Venue = require("./models/venueModel"); // ✅ Your Mongoose Venue model
const venues = require("./data/venues"); // ✅ Static data to seed

// Connect to DB
connectDB();

const importData = async () => {
  try {
    await Venue.deleteMany(); // Clear existing data
    await Venue.insertMany(venues); // Insert sample data
    console.log("✅ Venue data imported successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

importData();
