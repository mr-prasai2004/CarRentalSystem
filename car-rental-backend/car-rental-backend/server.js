const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); 
const carRoutes = require('./routes/cars'); 
const sequelize = require("./config/db");
const User = require("./models/User");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch(err => {
    console.error("Sequelize sync error:", err);
    process.exit(1); 
  });
