import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionBooking = () => {
  const [session, setSession] = useState({
    mentorId: '',
    learnerId: '',
    sessionDate: '',
    recurring: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/sessions`);
      setSessions(response.data);
    } catch (error) {
      setError('Error fetching sessions: ' + error.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSession(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      // Combine date and time
      const sessionData = {
        mentorId: parseInt(session.mentorId),
        learnerId: parseInt(session.learnerId),
        sessionDate: new Date(session.sessionDate).toISOString(),
        recurring: session.recurring
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sessions`, sessionData);
      setSuccess('Session booked successfully!');
      setSession({
        mentorId: '',
        learnerId: '',
        sessionDate: '',
        recurring: false
      });
      fetchSessions(); // Refresh the sessions list
    } catch (error) {
      setError('Error booking session: ' + (error.response?.data?.message || error.message));
      console.error('Error booking session:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Session Booking</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            name="mentorId"
            value={session.mentorId}
            placeholder="Mentor ID"
            onChange={handleChange}
            className="border p-2 rounded"
            required
            min="1"
          />
          <input
            type="number"
            name="learnerId"
            value={session.learnerId}
            placeholder="Learner ID"
            onChange={handleChange}
            className="border p-2 rounded"
            required
            min="1"
          />
          <input
            type="datetime-local"
            name="sessionDate"
            value={session.sessionDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="recurring"
              checked={session.recurring}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Recurring Session</span>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Session
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Booked Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions booked yet.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((s) => (
              <div key={s.id} className="border p-4 rounded">
                <p><strong>Mentor ID:</strong> {s.mentorId}</p>
                <p><strong>Learner ID:</strong> {s.learnerId}</p>
                <p><strong>Date:</strong> {new Date(s.sessionDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {s.status}</p>
                <p><strong>Recurring:</strong> {s.recurring ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionBooking;