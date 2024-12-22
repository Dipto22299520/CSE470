import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchTopMentor() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the data from the backend
    axios
      .get("/")
      .then((res) => {
        // Assuming the response is an array of data
        console.log("Response from server:", res.data);
        setData(res.data); // Store data in state
      })
      .catch((err) => {
        console.error("Error fetching top data:", err);
        setError("There was an issue fetching the top data.");
      });
  }, []);

  return (
    <div>
      <h1>Top data</h1>
      {/* Display error message if there is one */}
      {error && <p>{error}</p>}
      
      {/* Display data data */}
      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Expertise</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((mentor) =>{
              return (<tr>
                <td>{mentor.id}</td>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.selling_line}</td>
                <td>{mentor.rating}</td>
                <td>{mentor.price}</td>
              </tr>
              )
            } 
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FetchTopMentor;
