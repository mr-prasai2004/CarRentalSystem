const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Car = sequelize.define("Car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rental_id: { type: DataTypes.INTEGER, allowNull: true },
  model: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  price_per_day: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM("available", "rented", "maintenance"),
    allowNull: false,
    defaultValue: "available",
  },
  image_url: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: "cars",
  timestamps: false
});

module.exports = Car;
