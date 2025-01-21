import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobListPage from './components/JobListPage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import JobForm from './components/JobForm';
import JobTable from './components/JobTable';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<JobListPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/add-job/:id" element={<JobForm />} />
            <Route path="/view-job/:id" element={<JobTable />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
