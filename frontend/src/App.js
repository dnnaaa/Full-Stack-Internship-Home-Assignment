import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './config/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import AddEditJob from './pages/AddEditJob';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/add-job" element={<AddEditJob />} />
          <Route path="/edit-job/:id" element={<AddEditJob />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
