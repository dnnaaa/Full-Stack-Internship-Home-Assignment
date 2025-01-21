//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import UpdateJobForm from './components/UpdateJobForm';
import NavigationBar from './components/NavigationBar';


function App() {
 /*  return (
   <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  return (
    <Router>
      <NavigationBar />
        <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/add-job" element={<JobForm />} />
            <Route path="/update-job/:id" element={<UpdateJobForm />} />
        </Routes>
    </Router>
  );
}

export default App;
