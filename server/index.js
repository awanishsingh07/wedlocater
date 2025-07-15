const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/wedlocater", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 👇 Add this line to use booking routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api", bookingRoutes);

// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
