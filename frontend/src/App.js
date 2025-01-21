import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import AddEditJob from './Pages/AddEditJob';
import JobList from './Pages/JobList';
import 'react-toastify/dist/ReactToastify.css';  // Import Toast styles

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs/add" element={<AddEditJob />} />
        <Route path="/jobs/edit/:id" element={<AddEditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
