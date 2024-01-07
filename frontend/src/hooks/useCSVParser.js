import { useState } from 'react';
import { uploadFile, getEmployees, getJobSummary } from '@/services/api';

const useCSVParser = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState({});
  const [showTables, setShowTables] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProcessClick = () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadFile(formData)
      .then(response => {
        console.log(response.data);
        fetchData();
        setShowTables(true);
      })
      .catch(error => {
        console.error('Error processing CSV file:', error);
      });
  };

  const fetchData = () => {
    getEmployees()
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });

    getJobSummary()
      .then(response => {
        setJobSummary(response.data);
      })
      .catch(error => {
        console.error('Error fetching job summary data:', error);
      });
  };

  return {
    file,
    employees,
    jobSummary,
    showTables,
    handleFileChange,
    handleProcessClick,
    fetchData,
  };
};

export default useCSVParser;
