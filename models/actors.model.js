const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(12),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Actor };
