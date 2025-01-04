import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupStudyRooms = () => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/groups`);
        if (Array.isArray(response.data)) {
          setGroups(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/groups`, group);
      setGroups([...groups, response.data]);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Group Study Rooms</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Group Name" onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} />
        <button type="submit">Create Group</button>
      </form>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name} - {group.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupStudyRooms;