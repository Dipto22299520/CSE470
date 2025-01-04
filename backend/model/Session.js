const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SessionBooking = sequelize.define('SessionBooking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'Mentor ID is required' },
      isInt: { msg: 'Mentor ID must be a number' }
    }
  },
  learnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: 'Learner ID is required' },
      isInt: { msg: 'Learner ID must be a number' }
    }
  },
  sessionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: 'Session date is required' },
      isDate: { msg: 'Invalid date format' }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
    allowNull: false
  },
  recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  underscored: true, // Use snake_case for automatically generated fields
  tableName: 'session_bookings'
});

module.exports = {
  SessionBooking,
  Op: Sequelize.Op
};
