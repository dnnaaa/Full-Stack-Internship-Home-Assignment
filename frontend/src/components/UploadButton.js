import React, { useState, useEffect } from 'react';
import ProcessButton from './ProcessButton';
import EmployeeTable from './EmployeeTable';
import JobSummaryTable from './JobSummaryTable';

const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleProcess = async () => {
    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Envoyez le fichier à l'API de chargement
      await fetch('http://localhost:8080/api/csv/upload', {
        method: 'POST',
        body: formData,
      });

      // Récupérez la liste des employés depuis l'API
      const response = await fetch('http://localhost:8080/api/csv/employees');
      const employeeData = await response.json();
      setEmployees(employeeData);

      // Récupérez le tableau des résumés d'emploi depuis l'API
      const jobSummaryResponse = await fetch('http://localhost:8080/api/csv/job-summary');
      const jobSummaryData = await jobSummaryResponse.json();
      setJobSummary(jobSummaryData);

      setShowResults(true);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    setShowResults(false);
    setEmployees([]);
    setJobSummary([]);
    setCurrentPage(1);
  }, [selectedFile]);

  return (
    <div className="container">
      <div className="upload-container">
        <div className="button-container">
          <label htmlFor="file-upload" className="upload-label">
            Choose a file
          </label>
          <input
            type="file"
            accept=".csv"
            id="file-upload"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="upload-input"
          />

          {selectedFile && !processing && !showResults && <ProcessButton onClick={handleProcess} />}
        </div>

        {processing && <div className="processing-message">Processing...</div>}

        {showResults && (
          <div className="result-container">
            <EmployeeTable employees={employees} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <JobSummaryTable jobSummary={jobSummary} />
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f7f7f7;
        }

        .upload-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border: 2px solid #3498db;
          border-radius: 15px;
          background-color: #ffffff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .upload-label {
          background-color: #3498db;
          color: white;
          padding: 15px;
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .upload-input {
          display: none;
        }

        .result-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .processing-message {
          margin-top: 20px;
          font-size: 18px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default UploadButton;
