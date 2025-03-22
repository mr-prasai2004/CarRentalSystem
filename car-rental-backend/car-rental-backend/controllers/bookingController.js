export const bookCar = (req, res) => {
    const { user_id, car_id, start_date, end_date } = req.body;
  
    db.query(
      "INSERT INTO bookings (user_id, car_id, start_date, end_date, status) VALUES (?, ?, ?, ?, 'pending')",
      [user_id, car_id, start_date, end_date],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
  
        // Change car status to 'rented'
        db.query("UPDATE cars SET status = 'rented' WHERE id = ?", [car_id]);
  
        res.json({ message: "Car booked successfully!", bookingId: result.insertId });
      }
    );
  };
  