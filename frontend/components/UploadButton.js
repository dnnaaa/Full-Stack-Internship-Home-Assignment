// UploadButton.js

import React, { useState, useEffect } from 'react';
import ProcessButton from './ProcessButton';
import EmployeeTable from './EmployeeTable';
import JobSummaryTable from './JobSummaryTable';
import styles from './styles/UploadButton.module.css';

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
      const data = await response.json();
      setEmployees(data);

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
    setCurrentPage(1);
  }, [selectedFile]);

  return (
    <div className={styles['center-container']}>
      <div className={styles['upload-container']}>
        <div className={styles['button-container']}>
          <label htmlFor="file-upload" className={styles['upload-label']}>
            Choose a file
          </label>
          <input
            type="file"
            accept=".csv"
            id="file-upload"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className={styles['upload-input']}
          />

          {selectedFile && !processing && !showResults && (
            <ProcessButton onClick={handleProcess} />
          )}
        </div>

        {processing && (
          <div className={styles['processing-message']}>Processing...</div>
        )}

        {showResults && (
          <div className={styles['result-container']}>
            <EmployeeTable employees={employees} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <JobSummaryTable jobSummary={jobSummary} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadButton;
