const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/userController"); // ✅ Import all

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/users", createUser); // ✅ Fix missing import
router.get("/users", getUsers); // ✅ Fix missing import
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
