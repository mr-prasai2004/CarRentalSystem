const authMiddleware = require("../middleware/authMiddleware");

// Get all bookings (Admin only)
router.get("/admin", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query(
    `SELECT b.id, u.username, c.brand, c.model, c.year, c.price_per_day, 
            b.start_date, b.end_date, c.image_url, c.id AS car_id, b.status
     FROM bookings b 
     JOIN cars c ON b.car_id = c.id
     JOIN users u ON b.user_id = u.id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});
