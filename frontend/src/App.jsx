import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles'; // Material-UI theme provider
import CssBaseline from '@mui/material/CssBaseline'; // Resets CSS to provide a consistent baseline
import darkTheme from './config/theme'; // Custom dark theme configuration
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing components
import JobList from './views/JobList'; // Job list view
import AddEditJob from './views/AddEditJob'; // Add/Edit job view
import Loader from './components/loader/loader'; // Custom loader component

/**
 * The root component of the application.
 * It sets up the theme, routing, and a loading screen for initial data fetch.
 */
function App() {
  // State to manage the loading screen
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Simulates fetching data with a delay to display the loading screen.
   * The `setTimeout` simulates an asynchronous operation.
   */
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false); // Hide the loader after 7 seconds
      }, 7000);
    };

    fakeDataFetch();
  }, []); // Empty dependency array ensures this runs only once on component mount

  /**
   * If the app is loading, display the `Loader` component.
   * Otherwise, render the main application with the theme and routing.
   */
  return isLoading ? (
    <Loader /> // Show the loader while loading
  ) : (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Applies the Material-UI CSS reset */}
      <Router>
        <Routes>
          {/* Define routes for the application */}
          <Route path="/" element={<JobList />} /> {/* Job list view */}
          <Route path="/add-job" element={<AddEditJob />} /> {/* Add job view */}
          <Route path="/edit-job/:id" element={<AddEditJob />} /> {/* Edit job view */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
