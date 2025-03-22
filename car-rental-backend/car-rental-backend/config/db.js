// db.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Create a new Sequelize instance to connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username
  process.env.DB_PASS,     // Password
  {
    host: process.env.DB_HOST,  // Host
    dialect: "mysql",           // Dialect (MySQL in this case)
    logging: false,             // Disable logging of SQL queries (optional)
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
