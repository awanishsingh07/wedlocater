const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/wedlocater", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🔀 Routes
const userRoutes = require("./routes/UserRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/users", userRoutes); // e.g. /api/users/login
app.use("/api/bookings", bookingRoutes); // e.g. /api/bookings/user

// Server start
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
