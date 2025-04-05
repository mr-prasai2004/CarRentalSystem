const express = require("express");
const router = express.Router();
const { authenticateJWT, authorizeRole } = require("../middleware/authMiddleware");
const { getAllCars, addCar, updateCar, deleteCar } = require("../controllers/carController");

// Ensure only admins can manage cars
router.get("/", getAllCars);

router.post("/", authenticateJWT, authorizeRole(["admin","rental"]), addCar);
router.put("/:id", authenticateJWT, authorizeRole(["admin","rental"]), updateCar);
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteCar);

module.exports = router;
