import React, { useState } from 'react';
import axios from 'axios';
import FileUploadButton from '../components/FileUploadButton';
import ProcessButton from '../components/ProcessButton';
import EmployeeTable from '../components/EmployeeTable';
import JobsSummaryTable from '../components/JobsSummaryTable';


const Home = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showProcessButton, setShowProcessButton] = useState(false);
  const [jobsSummaries, setJobsSummaries] = useState([]);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setShowProcessButton(true);
  };

  const handleProcess = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response2 = await axios.get('http://localhost:8080/average-salary');
      
      setEmployees(response.data);
      setJobsSummaries(response2.data)
      setShowProcessButton(false);

    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  return (
    <div className='flex min-h-screen max-h-screen flex-col items-center justify-center font-mono bg-black text-white'>
      

      {!file ? (
        <FileUploadButton onFileUpload={handleFileUpload} />
      ) : showProcessButton ? (
        <div className='flex min-h-screen max-h-screen flex-row items-center justify-between'>
          <FileUploadButton onFileUpload={handleFileUpload} />
          <ProcessButton onProcess={handleProcess} />
        </div>
        
      ) : (
        <div>
          <FileUploadButton onFileUpload={handleFileUpload} />
          <EmployeeTable employees={employees} />
          <JobsSummaryTable jobsSummaries={jobsSummaries} />
        </div>
      )}
    </div>
  );
};

export default Home;
