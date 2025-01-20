import React from 'react'; // Import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import JobListPage from './pages/JobListPage'; // Import de la page JobListPage
import JobFormPage from './pages/JobFormPage'; // Import de la page JobFormPage



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la liste des jobs */}
        <Route path="/" element={<JobListPage />} />

        {/* Route pour ajouter un job */}
        <Route path="/add-job" element={<JobFormPage />} />

        {/* Route pour mettre à jour un job */}
        <Route path="/update-job/:id" element={<JobFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
