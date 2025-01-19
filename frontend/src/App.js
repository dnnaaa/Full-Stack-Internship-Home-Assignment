import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import AddEditJob from './pages/AddEditJob';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add-job" element={<AddEditJob />} />
        <Route path="/edit-job/:id" element={<AddEditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
