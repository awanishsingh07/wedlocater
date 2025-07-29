const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to verify any logged-in user
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ status: "error", error: "User not found" });
    }

    req.user = user; // 👈 Make user accessible in routes
    next();
  } catch (err) {
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
};

// ✅ Middleware specifically for admins
const requireAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ status: "error", error: "Access denied" });
    }

    req.user = user; // Still useful in admin routes
    next();
  } catch (err) {
    res.status(401).json({ status: "error", error: "Invalid token" });
  }
};

module.exports = { requireAuth, requireAdmin };
