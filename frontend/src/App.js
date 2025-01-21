import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobForm from './components/JobForm';
import NewJobForm from './components/NewJobForm';
import JobList from './components/JobList';
import Appbar from './components/Appbar'

function App() {
  return (
    <div>
      <Appbar/>
    
      <Router>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/new" element={<NewJobForm />} />
          <Route path="/edit/:id" element={<JobForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
