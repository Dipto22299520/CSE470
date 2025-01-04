const GoalTracking = require('../model/Goal');

// Get all goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await GoalTracking.findAll();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const goal = await GoalTracking.create(req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

// Get goals for a specific learner
exports.getGoalsByLearner = async (req, res) => {
  try {
    const goals = await GoalTracking.findAll({
      where: { learnerId: req.params.learnerId }
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// Update a goal
exports.updateGoal = async (req, res) => {
  try {
    const [updated] = await GoalTracking.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedGoal = await GoalTracking.findByPk(req.params.id);
      res.status(200).json(updatedGoal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  try {
    const deleted = await GoalTracking.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
};