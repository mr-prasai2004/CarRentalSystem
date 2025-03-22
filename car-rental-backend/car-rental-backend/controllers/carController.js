const db = require("../config/db");

exports.getAllCars = async (req, res) => {
  try {
    const [cars] = await db.query("SELECT * FROM cars");
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

// Assuming you have a Car model defined
const Car = require('../models/car');

exports.addCar = async (req, res, next) => {
  try {
    let { rental_id = null, model, brand, year, price_per_day, status, image_url } = req.body;

    rental_id = rental_id ? parseInt(rental_id, 10) : null;
    const yearInt = parseInt(year, 10);
    const priceFloat = parseFloat(price_per_day);

    if (!model || !brand || isNaN(yearInt) || isNaN(priceFloat)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    Car.create(
      {
        rental_id,
        model,
        brand,
        year: yearInt,
        price_per_day: priceFloat,
        status: status || "available",
        image_url: image_url || null,
      },
      (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return next(err); // Pass the error to global handler
        }
        res.status(201).json({ message: "Car added successfully", carId: result.insertId });
      }
    );

  } catch (error) {
    console.error("Unexpected Error:", error);
    next(error); // Pass error to global handler
  }
};


exports.updateCar = async (req, res) => {
  const { id } = req.params;
  let { rental_id, model, brand, year, price_per_day, status, image_url } = req.body;

  // Convert necessary fields
  const carId = parseInt(id, 10);
  rental_id = rental_id ? parseInt(rental_id, 10) : null;
  const yearInt = parseInt(year, 10);
  const priceFloat = parseFloat(price_per_day);

  if (!model || !brand || isNaN(yearInt) || isNaN(priceFloat) || !status) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    // Try using named placeholders if your DB library supports them
    const sqlQuery = `
      UPDATE cars 
      SET rental_id = ${rental_id === null ? 'NULL' : rental_id}, 
          model = '${model}', 
          brand = '${brand}', 
          year = ${yearInt}, 
          price_per_day = ${priceFloat}, 
          status = '${status}', 
          image_url = '${image_url}' 
      WHERE id = ${carId}
    `;
    
    console.log("Executing SQL Query:", sqlQuery);
    
    const [result] = await db.query(sqlQuery);
    
    console.log("SQL Update Result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Car updated successfully" });
  } catch (error) {
    console.error("Update Car Error:", error.message);
    res.status(500).json({ error: "Error updating car", details: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete car with ID:", id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const deletedRows = await Car.destroy({ where: { id } });

    if (!deletedRows) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Delete Car Error:", error);
    res.status(500).json({ error: "Error deleting car", details: error.message });
  }
};
