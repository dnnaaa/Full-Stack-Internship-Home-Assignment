import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import EmployeeTable from './components/EmployeeTable';
import JobSummaryTable from './components/JobSummaryTable';

const App = () => {
  const [csvData, setCSVData] = useState(null);

  const handleFileUpload = (data) => {
    setCSVData(data);
  };

  return (
    <div>
      <h1>CSV Parser</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      {csvData && (
        <div>
          <h2>Employee Information</h2>
          <EmployeeTable employees={csvData.employeesByJobTitle} />
          <h2>Job Summary</h2>
          <JobSummaryTable employeesByJobTitle={csvData.employeesByJobTitle} />
        </div>
      )}
    </div>
  );
};

export default App;