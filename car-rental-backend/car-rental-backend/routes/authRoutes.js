const express = require("express");
const { signup } = require("../controllers/authController");  // ✅ Ensure this import exists
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);  // ✅ Ensure "signup" is correctly imported
router.post("/login", authController.login);
module.exports = router;
