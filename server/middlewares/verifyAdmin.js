const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret-key");

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ status: "error", error: "Access denied: Not an admin" });
    }

    req.user = decoded; // Save decoded token info if needed
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "error", error: "Invalid or expired token" });
  }
}

module.exports = verifyAdmin;
