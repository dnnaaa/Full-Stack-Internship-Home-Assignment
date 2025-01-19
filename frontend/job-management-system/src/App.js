import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddJob from "./jobs/AddJob";
import EditJob from "./jobs/EditJob";
import ViewJob from "./jobs/ViewJob";

function App() {
  return (
      <div className="App">
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addjob" element={<AddJob />} />
            <Route exact path="/editjob/:id" element={<EditJob />} />
            <Route exact path="/viewjob/:id" element={<ViewJob />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
