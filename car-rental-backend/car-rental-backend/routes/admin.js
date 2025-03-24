const express = require("express");
const router = express.Router();
const { authenticateJWT, authorizeRole } = require("../middleware/authMiddleware");

// Protect all admin routes
router.get("/admin-data", authenticateJWT, authorizeRole(["admin"]), (req, res) => {
  res.json({ message: "Admin Data Access Granted" });
});

module.exports = router;
