import React, { useState } from 'react';
import UploadButton from '../components/UploadButton';
import ProcessButton from '../components/ProcessButton';
import EmployeeTable from '../components/EmployeeTable';
import JobSummaryTable from '../components/JobSummaryTable';
import { uploadCSV, fetchEmployees, fetchJobSummaries } from './api/apiService';

const EmployeePage = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [jobSummaries, setJobSummaries] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      await uploadCSV(file);
      setFileUploaded(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleProcessClick = async () => {
    try {
      const employeesData = await fetchEmployees();
      const jobSummariesData = await fetchJobSummaries();

      setEmployees(employeesData);
      setJobSummaries(jobSummariesData);
      setFileUploaded(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <UploadButton onChange={handleFileChange} />
      {fileUploaded ? <ProcessButton onClick={handleProcessClick} /> : null}
      {employees.length > 0 && jobSummaries.length > 0 && (
        <>
          <EmployeeTable employees={employees} />
          <JobSummaryTable jobSummaries={jobSummaries} />
        </>
      )}
    </div>
  );
};

export default EmployeePage;
