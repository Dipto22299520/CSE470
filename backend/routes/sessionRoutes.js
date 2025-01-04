const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controller/sessionController');

// Get all sessions
sessionRouter.get('/', sessionController.getAllSessions);

// Create a new session booking
sessionRouter.post('/', sessionController.createBooking);

// Get bookings for a specific user (either mentor or learner)
sessionRouter.get('/user/:userId', sessionController.getBookingsByUser);

// Update booking status
sessionRouter.put('/:id/status', sessionController.updateBookingStatus);

module.exports = sessionRouter;
