import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import JobListPage from "./pages/JobListPage";
import AddEditJobPage from "./pages/AddEditJobPage";
import HeaderComponent from "./components/HeaderComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <HeaderComponent onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<JobListPage />} />
            <Route path="/add-job" element={<AddEditJobPage />} />
            <Route path="/edit-job/:id" element={<AddEditJobPage />} />
          </Routes>
          <ToastContainer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
