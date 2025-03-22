const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from the header
  
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid Token" });
    }
    req.user = user; // Save user info in request
    next();
  });
};

// Middleware to check for specific roles
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Forbidden" });
    }
    next();
  };
};

// ✅ Corrected Export
module.exports = { authenticateJWT, authorizeRole };
