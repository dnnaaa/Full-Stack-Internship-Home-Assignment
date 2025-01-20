import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobsPage from './app/jobs/index';
import NewJobPage from './app/jobs/new';
import EditJobPage from './app/jobs/[id]';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
        <Route path="/jobs/:id" element={<EditJobPage />} />
      </Routes>
    </Router>
  );
};

export default App;
