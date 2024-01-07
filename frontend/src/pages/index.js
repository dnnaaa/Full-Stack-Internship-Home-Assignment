
import React, { useState } from 'react';
import UploadButton from '../../components/UploadButton';

import { parse } from 'papaparse';

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setDataReady(false); // Reset dataReady when a new file is selected
  };

  const handleProcess = () => {
    if (selectedFile) {
      setProcessing(true);

      parse(selectedFile, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          // Implement your processing logic here
          // Update employees and jobSummary state
          setEmployees(result.data);
          // Example: Calculate average salary for each position
          const positions = [...new Set(result.data.map((employee) => employee.position))];
          const summaryData = positions.map((position) => {
            const positionEmployees = result.data.filter((employee) => employee.position === position);
            const averageSalary =
              positionEmployees.reduce((sum, employee) => sum + employee.salary, 0) /
              positionEmployees.length;
            return { position, averageSalary };
          });
          setJobSummary(summaryData);

          setProcessing(false);
          setDataReady(true); // Set dataReady to true when data is ready
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setProcessing(false);
        },
      });
    }
  };

  return (
    <div>
      <UploadButton onFileSelect={handleFileSelect} />

    </div>
  );
};

export default HomePage;
