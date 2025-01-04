const Reminder = require('../model/Reminder');

// Get all reminders
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      order: [['sendAt', 'ASC']]
    });
    res.status(200).json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ 
      message: 'Error fetching reminders', 
      error: error.message 
    });
  }
};

// Create a reminder
exports.createReminder = async (req, res) => {
  try {
    const { sessionId, message, sendAt } = req.body;

    // Validate required fields
    if (!sessionId || !message || !sendAt) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['sessionId', 'message', 'sendAt']
      });
    }

    const reminder = await Reminder.create({
      sessionId,
      message,
      sendAt: new Date(sendAt)
    });

    res.status(201).json(reminder);
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ 
      message: 'Error creating reminder', 
      error: error.message 
    });
  }
};

// Get reminders for a session
exports.getRemindersBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    const reminders = await Reminder.findAll({
      where: { sessionId },
      order: [['sendAt', 'ASC']]
    });

    res.status(200).json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ 
      message: 'Error fetching reminders', 
      error: error.message 
    });
  }
};

// Update a reminder
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, sendAt } = req.body;

    const reminder = await Reminder.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    await reminder.update({
      message: message || reminder.message,
      sendAt: sendAt ? new Date(sendAt) : reminder.sendAt
    });

    res.status(200).json(reminder);
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ 
      message: 'Error updating reminder', 
      error: error.message 
    });
  }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    await reminder.destroy();
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ 
      message: 'Error deleting reminder', 
      error: error.message 
    });
  }
};