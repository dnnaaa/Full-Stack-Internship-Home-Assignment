import React, { useState } from 'react';
import axios from 'axios';
import EmployeeTable from '@/components/EmployeeTable';
import JobsSummaryTable from '@/components/JobsSummaryTable';
import { Pagination } from './Pagination';

const FileUploadWithResults = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 20;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setEmployees([]);
    setJobSummary([]);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8080/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const employees = await axios.get('http://localhost:8080/files/employees');

      const jobSummary = await axios.get('http://localhost:8080/files/averageSalariesByJobTitle');

      console.log('Response data:', response.data);
      console.log('data employees:', employees);
      console.log('data jobSummary:', jobSummary);

      setEmployees(employees.data);
      setJobSummary(jobSummary.data);
    } catch (error) {
      console.error('Error during file upload:', error);
      setError('An error occurred during file upload.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div>
      {/* Interface-1: Upload button */}
      <h1>File Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Interface-2: Process button */}
      {file && !loading && !error && (
        
        <div class="ml-8">
          <br/> <br/> <br/>
          
          <h2>File Processing</h2>
          <button onClick={handleUpload} disabled={loading}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Process
          </button>
          <br/> <br/>
        </div>
      )}

      {/* Interface-3: Tables showing processing results */}
      { employees && employees.length > 0  &&(
        <div>
          <Pagination employees={employees} employeesPerPage={100} />
          <br/> <br />
          
          <JobsSummaryTable jobSummary={jobSummary} />
        </div>
      )}
    </div>
  );
};

export default FileUploadWithResults;
