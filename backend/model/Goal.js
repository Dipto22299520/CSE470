const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GoalTracking = sequelize.define('GoalTracking', {
  // Define goal model attributes
  learnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = GoalTracking;