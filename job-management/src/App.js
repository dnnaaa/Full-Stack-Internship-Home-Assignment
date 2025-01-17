// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListPage from './JobListPage';
import JobFormPage from './JobFormPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<JobListPage />} />
          <Route path="/add" element={<JobFormPage />} />
          <Route path="/edit/:id" element={<JobFormPage />} />
        </Routes>
      </Router>
  );
}

export default App;
