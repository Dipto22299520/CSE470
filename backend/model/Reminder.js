const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reminder = sequelize.define('Reminder', {
  // Define reminder model attributes
  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sendAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Reminder;