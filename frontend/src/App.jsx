import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LearningSessions from './pages/LearningSessions';
import AboutTheCompany from './pages/about_the_company';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearningSessions />} />
        <Route path="/about" element={<AboutTheCompany />} />
      </Routes>
    </Router>
  );
}

export default App;