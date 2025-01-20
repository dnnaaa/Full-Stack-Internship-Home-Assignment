import React from 'react';
import {useState, useEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './config/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './views/JobList';
import AddEditJob from './views/AddEditJob';
import Loader from './components/loader/loader'



function App() {
   // loader state
   const [isLoading, setIsLoading] = useState(true);

   // Let create async method to fetch fake data
   useEffect(() => {
     const fakeDataFetch = () => {
       setTimeout(() => {
         setIsLoading(false);
       }, 7000);
     };
 
     fakeDataFetch();
   }, []);
 
   return isLoading ? (
     <Loader />
   ) : (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<JobList/>} />
          <Route path="/add-job" element={<AddEditJob />} />
          <Route path="/edit-job/:id" element={<AddEditJob />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
