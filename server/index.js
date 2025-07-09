const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb://localhost:27017/wedlocater", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: "error", error: "Email already exists!" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.json({ status: "ok", user });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong. Try again!" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: "error", error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ status: "error", error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, "secret-key", { expiresIn: "1h" });
  res.json({ status: "ok", token });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
