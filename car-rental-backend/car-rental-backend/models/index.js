// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");  // Import the sequelize instance

// Import models
const User = require("./User")(sequelize, DataTypes);

// Export models
module.exports = { User, sequelize };
