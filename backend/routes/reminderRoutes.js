const express = require('express');
const reminderRouter = express.Router();
const reminderController = require('../controller/reminderController');

// Get all reminders
reminderRouter.get('/', reminderController.getAllReminders);

// Create a new reminder
reminderRouter.post('/', reminderController.createReminder);

// Get reminders for a specific session
reminderRouter.get('/session/:sessionId', reminderController.getRemindersBySession);

// Update a reminder
reminderRouter.put('/:id', reminderController.updateReminder);

// Delete a reminder
reminderRouter.delete('/:id', reminderController.deleteReminder);

module.exports = reminderRouter;
