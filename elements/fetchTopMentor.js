const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cse470_project",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Fetch top mentors route
router.get('/api/top-mentors', (req, res) => {
  const queries = [
    "SELECT * FROM programming ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM web_development ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM database_management ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM cloud_computing ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM cybersecurity ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM data_science_analytics ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM ai_ml ORDER BY rating DESC LIMIT 1",
    "SELECT * FROM version_control ORDER BY rating DESC LIMIT 1",
  ];

  // Execute all queries
  Promise.all(
    queries.map(query => new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results[0]); // Get the top mentor
      });
    }))
  )
    .then(topMentors => res.json(topMentors))
    .catch(error => {
      console.error("Error fetching top mentors:", error);
      res.status(500).send("Error fetching top mentors");
    });
});

module.exports = router;
