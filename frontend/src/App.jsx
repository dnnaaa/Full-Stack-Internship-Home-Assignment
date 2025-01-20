// App.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import JobListPage from "./pages/JobListPage"; 

function App() {
  return (
    <div className="App">
      <JobListPage />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </div>
  );
}

export default App;
