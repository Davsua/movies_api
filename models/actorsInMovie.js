const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const ActorInMovie = sequelize.define('actorInMovies', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorInMovie };
