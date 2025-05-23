const express = require("express");
const { signup } = require("../controllers/authController");  // ✅ Ensure this import exists
const authController = require("../controllers/authController");
const { getUsers } = require("../controllers/userController");
const { updateUser } = require("../controllers/userController");
const { deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post("/signup", signup);  // ✅ Ensure "signup" is correctly imported
router.post("/login", authController.login);
router.get("/users", getUsers);
router.put('/users/:id', updateUser);;
router.delete('/users/:id', deleteUser);
module.exports = router;
