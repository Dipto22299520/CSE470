const { SessionBooking, Op } = require('../model/Session');

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await SessionBooking.findAll({
      order: [['sessionDate', 'DESC']]
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      message: 'Error fetching sessions',
      error: error.message
    });
  }
};

// Create a session booking
exports.createBooking = async (req, res) => {
  try {
    const { mentorId, learnerId, sessionDate, recurring } = req.body;

    // Validate required fields
    if (!mentorId || !learnerId || !sessionDate) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['mentorId', 'learnerId', 'sessionDate']
      });
    }

    // Validate that mentorId and learnerId are numbers
    if (isNaN(mentorId) || isNaN(learnerId)) {
      return res.status(400).json({
        message: 'Invalid ID format',
        details: 'mentorId and learnerId must be numbers'
      });
    }

    // Create the booking
    const booking = await SessionBooking.create({
      mentorId: parseInt(mentorId),
      learnerId: parseInt(learnerId),
      sessionDate: new Date(sessionDate),
      recurring: recurring || false,
      status: 'pending'
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get bookings for a specific user (either mentor or learner)
exports.getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        message: 'Invalid user ID',
        details: 'User ID must be a number'
      });
    }

    const bookings = await SessionBooking.findAll({
      where: {
        [Op.or]: [
          { mentorId: userId },
          { learnerId: userId }
        ]
      },
      order: [['sessionDate', 'DESC']]
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Update a booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['id', 'status']
      });
    }

    const booking = await SessionBooking.findByPk(id);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      message: 'Error updating booking',
      error: error.message
    });
  }
};
