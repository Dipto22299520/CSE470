const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Import routes
const sessionRoutes = require('./routes/sessionRoutes');
const goalRoutes = require('./routes/goalRoutes');
const groupRoutes = require('./routes/groupRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/sessions', sessionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/reminders', reminderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Initialize database and start server
const PORT = process.env.PORT || 3001;

const initializeServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

initializeServer();