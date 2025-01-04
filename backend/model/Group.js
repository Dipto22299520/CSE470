const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GroupStudy = sequelize.define('GroupStudy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  studyTopic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sessionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: true // Optional mentor
  }
});

module.exports = GroupStudy;
