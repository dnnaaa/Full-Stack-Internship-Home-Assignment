import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import EmployeeTable from '../components/EmployeeTable';
import JobSummaryTable from '../components/JobSummaryTable';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [jobSummaries, setJobSummaries] = useState([]);

  const handleFileUpload = (data) => {
    // Assuming the API response includes both employee data and job summaries
    setEmployees(data.employees);
    setJobSummaries(data.jobSummaries);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <EmployeeTable employees={employees} />
      <JobSummaryTable jobSummaries={jobSummaries} />
    </div>
  );
};

export default App;
