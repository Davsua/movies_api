const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //image: {},
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(12),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movie };
