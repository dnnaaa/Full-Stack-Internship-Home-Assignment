import React, { useEffect, useState } from 'react';
import { useFileContext } from '../context/FileContext';
import Interface3 from './Interface3';

const Interface2 = () => {
  const { selectedFile, processingResults, setResults } = useFileContext();
  const [processing, setProcessing] = useState(false);

  const processFile = async () => {
    try {
      setProcessing(true);

      const formData = new FormData();
      formData.append('employeesFile', selectedFile);

      // Replace this URL with your actual backend API endpoint
      const response = await fetch('http://localhost:3001/api/v1/proccess_file/getEmployees', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Set the processing results in context
        setResults(data);
        // Log the updated processingResults
        console.log("Updated processingResults:", data);
      } else {
        console.error('Error processing file on the backend');
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main>
      {selectedFile && !processingResults && (
        <div className="flex items-center justify-center">
          <button
            onClick={processFile}
            disabled={processing}
            className="btn-primary py-2 px-4 cursor-pointer mr-4 rounded-lg"
          >
            {processing ? 'Processing...' : 'Process'}
          </button>
        </div>
      )}
      {processingResults && <Interface3 />}
    </main>
  );
};

export default Interface2;
