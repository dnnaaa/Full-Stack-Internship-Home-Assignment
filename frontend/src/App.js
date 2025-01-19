import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobListPage from './pages/JobListPage';
import JobFormPage from './pages/JobFormPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/add-job" element={<JobFormPage />} />
        <Route path="/edit-job/:id" element={<JobFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
