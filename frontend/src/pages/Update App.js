import React, { useState } from 'react';
import Upload from './Upload';
import EmployeeList from './EmployeeList';
import JobSummary from './JobSummary';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [jobSummaries, setJobSummaries] = useState([]);

  const handleFileSelected = (file) => {
    // Call the backend service to upload and process the file
    // Update employees and jobSummaries based on the backend response
  };

  return (
    <div>
      <Upload onFileSelected={handleFileSelected} />
      <EmployeeList employees={employees} />
      <JobSummary jobSummaries={jobSummaries} />
    </div>
  );
};

export default App;
