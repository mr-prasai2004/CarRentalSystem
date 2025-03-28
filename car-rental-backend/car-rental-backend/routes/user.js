const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/userController");

// Update user profile
router.put("/profile", authenticateJWT, updateProfile);

module.exports = router;
