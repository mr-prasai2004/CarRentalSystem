const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Session Expired. Please log in again." });
      }
      return res.status(403).json({ error: "Invalid Token" });
    }

    req.user = user; // Attach user info to request
    next();
  });
};

// Middleware to check for specific roles
const authorizeRole = (roles) => {
  return (req, res, next) => {
    console.log("🔥 authorizeRole check");
    console.log("Required roles:", roles);
    console.log("Decoded user from token:", req.user);

    if (!req.user || !roles.includes(req.user.role)) {
      console.log("❌ Unauthorized - role not allowed or missing");
      return res.status(403).json({ error: "Access Forbidden: Unauthorized Role" });
    }

    console.log("✅ Authorized user");
    next();
  };
};


module.exports = { authenticateJWT, authorizeRole };
