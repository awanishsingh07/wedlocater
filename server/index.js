const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://localhost:27017/wedlocater", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 👇 Add this line to use booking routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api", bookingRoutes);

// Register route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: "error", error: "Email already exists!" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hash });

    res.json({ status: "ok", user });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Registration failed. Try again." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ status: "error", error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1h" });
  res.json({ status: "ok", token });
});

// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
