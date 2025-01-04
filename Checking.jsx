import React, { useEffect, useState } from "react";
import "./CheckingPage.css"
const CheckingPage = () => {
  const [paycheckData, setPaycheckData] = useState([]);
  
  // Fetching data from the paycheck table
  useEffect(() => {
    fetch('http://localhost:8081/paycheck')  // API endpoint to get data
      .then(response => response.json())
      .then(data => setPaycheckData(data))
      .catch(err => console.error('Error fetching paycheck data:', err));
  }, []);
  
  const handleAction = (id, action) => {
    const url = `http://localhost:8081/action/${id}`;
    
    const requestData = { action };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(`${action} successful`, data);
        // Optionally update the UI or refetch data
      })
      .catch(err => console.error(`${action} failed:`, err));
  };

  const handleRefresh = () => {
    fetch('http://localhost:8081/refresh', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Paycheck table refreshed:', data);
        // Optionally refetch the data or clear the UI
      })
      .catch(err => console.error('Error refreshing paycheck table:', err));
  };

  return (
    <div>
      <h1>Manage Payment Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Mentor Name</th>
            <th>Security ID</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paycheckData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.student_name}</td>
              <td>{entry.student_email}</td>
              <td>{entry.mentor_name}</td>
              <td>{entry.security_id}</td>
              <td>{entry.price}</td>
              <td>
                <button onClick={() => handleAction(entry.id, 'accept')}>Accept</button>
                <button onClick={() => handleAction(entry.id, 'reject')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default CheckingPage;
