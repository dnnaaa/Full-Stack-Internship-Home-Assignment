import React, { useState } from 'react';
import EmployeesTable from './EmployeesTable'; 
import JobsTable from './JobsTable'; 

const CSVUploader = ({ onFileChange, onDataParsed }) => {
  const [file, setFile] = useState(null);
  const [employeesData, setEmployeesData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Fetch employees data
    const employeeUrl = `http://localhost:8080/api/employees?page=${currentPage}&pageSize=${pageSize}`;
    try {
      const response = await fetch(employeeUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setEmployeesData(data);
        setShowTable(true);
      } else {
        console.error('Error parsing employees CSV');
      }
    } catch (error) {
      console.error('Error during employees file upload:', error);
    }

    // Fetch jobs data
    const jobUrl = `http://localhost:8080/api/jobs`;
    try {
      const response = await fetch(jobUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setJobsData(data);
        setShowTable(true);
      } else {
        console.error('Error parsing jobs CSV');
      }
    } catch (error) {
      console.error('Error during jobs file upload:', error);
    }
  };

  return (
    <div className="container">
      <center className="upload-section">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {file && (
          <button onClick={handleUpload} 
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          style={{ backgroundColor: 'transparent', border: '2px solid blue', color: 'green', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Process
          </button>
        )}
      </center>
      <center>
        {showTable && (
                <div className="pagination">
                    <button
                    onClick={() => {
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
                        handleUpload();
                    }}
                    style={{ backgroundColor: 'transparent', border: '2px solid blue', color: 'green', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                    Previous
                    </button>
                    <span className="text-xl font-bold" style={{ margin: '0 8px' }}>{currentPage + 1}</span>
                    <button
                    onClick={() => {
                        setCurrentPage((prevPage) => prevPage + 1);
                        handleUpload();
                    }}
                    style={{ backgroundColor: 'transparent', border: '2px solid blue', color: 'green', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                    Next
                    </button>
              </div>
            )}
      </center>
      <div>
        {showTable && (
            <div className="table-section">
            {employeesData && <EmployeesTable data={employeesData} />}
            {jobsData && <JobsTable data={jobsData} />}
            </div>
        )}
      </div>
    </div>
  );
};

export default CSVUploader;
