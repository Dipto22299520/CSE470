const express = require('express');
const goalController = require('../controller/goalController');

const goalRouter = express.Router();

// Get all goals
goalRouter.get('/', goalController.getAllGoals);
// Create a new goal
goalRouter.post('/', goalController.createGoal);
// Get goals for a specific learner
goalRouter.get('/learner/:learnerId', goalController.getGoalsByLearner);
// Update a goal
goalRouter.put('/:id', goalController.updateGoal);
// Delete a goal
goalRouter.delete('/:id', goalController.deleteGoal);

module.exports = goalRouter;