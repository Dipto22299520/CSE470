import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoalTracking = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({
    learnerId: '',
    goal: '',
    deadline: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`localhost:3001/api/goals`);
      if (response.data) {
        setGoals(Array.isArray(response.data) ? response.data : []);
      }
      setError('');
    } catch (error) {
      setError('Error fetching goals: ' + (error.response?.data?.message || error.message));
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Ensure learnerId is sent as a number
      const goalData = {
        ...goal,
        learnerId: parseInt(goal.learnerId, 10)
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/goals`, goalData);
      if (response.data) {
        setGoals(prev => [...prev, response.data]);
        // Reset form
        setGoal({
          learnerId: '',
          goal: '',
          deadline: new Date().toISOString().split('T')[0]
        });
        setError('');
      }
    } catch (error) {
      setError('Error creating goal: ' + (error.response?.data?.message || error.message));
      console.error('Error creating goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/goals/${id}`);
      setGoals(prev => prev.filter(goal => goal.id !== id));
      setError('');
    } catch (error) {
      setError('Error deleting goal: ' + (error.response?.data?.message || error.message));
      console.error('Error deleting goal:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && goals.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Goal Setting and Achievement Tracking</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            name="learnerId"
            value={goal.learnerId}
            placeholder="Learner ID"
            onChange={handleChange}
            className="border p-2 rounded"
            required
            min="1"
          />
          <input
            type="text"
            name="goal"
            value={goal.goal}
            placeholder="Goal"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="deadline"
            value={goal.deadline}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Setting Goal...' : 'Set Goal'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center text-gray-500">No goals found. Create one to get started!</div>
        ) : (
          goals.map((g) => (
            <div key={g.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{g.goal}</p>
                <p className="text-sm text-gray-600">
                  Deadline: {new Date(g.deadline).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Learner ID: {g.learnerId}</p>
              </div>
              <button
                onClick={() => handleDelete(g.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalTracking;