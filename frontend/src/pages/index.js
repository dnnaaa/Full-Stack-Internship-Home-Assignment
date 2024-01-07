import { useState } from 'react';
import api from './api';
import FileUpload from './FileUpload';
import EmployeeInformation from './EmployeeInformation';
import JobSummary from './JobSummary';

const Home = () => {
  const [file, setFile] = useState(null);
  const [processingResults, setProcessingResults] = useState(null);
  const [state, setState] = useState(true);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleProcessClick = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData);

      setProcessingResults(response.data);
      setState(false)
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <div className='d-flex flex-row flex-direction-row align-items-center justify-content-center'>
      <FileUpload onFileChange={handleFileChange} />
      
      { file && <button onClick={handleProcessClick} className={`btn btn-primary text-center `} hidden={!state}>{state && "Process"}</button>}
      </div>
      
      {processingResults && (
        <>
          <EmployeeInformation employees={processingResults.employees} />
          <JobSummary jobsummaries={processingResults.jobSummaries} />
        </>
      )}
    </div>
  );
};

export default Home;

