import { Route, Routes } from "react-router-dom";
import "./App.css";
import JobListPage from "./pages/JobListPage";
import JobAddPage from "./pages/JobAddPage";
import JobEditPage from "./pages/JobEditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobListPage />} />
      <Route path="/jobs/add" element={<JobAddPage />} />
      <Route path="/jobs/edit/:id" element={<JobEditPage />} />
    </Routes>
  );
}

export default App;
