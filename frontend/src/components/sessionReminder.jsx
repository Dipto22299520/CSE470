import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionReminders = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reminders`,reminders);
        if (Array.isArray(response.data)) {
          setReminders(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div>
      <h2>Session Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>{reminder.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SessionReminders;