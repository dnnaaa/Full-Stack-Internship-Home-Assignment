// components/ProcessResultsComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ProcessResultsComponent = () => {
  const [results, setResults] = useState(null);

  const handleProcess = async () => {
    try {
      const response = await axios.get('/api/process');
      setResults(response.data);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleProcess}>Process</button>

      {results && (
        <div>
          <h2>Employee Information</h2>
          {/* Render a paginated list of employees */}
          <ul>
            {results.employees.map((employee, index) => (
              <li key={index}>{`${employee.id} - ${employee.name} - ${employee.jobTitle} - ${employee.salary}`}</li>
            ))}
          </ul>

          <h2>Jobs Summary</h2>
          {/* Render a table showing average salaries for each job title */}
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.averageSalaries).map(([jobTitle, avgSalary]) => (
                <tr key={jobTitle}>
                  <td>{jobTitle}</td>
                  <td>{avgSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProcessResultsComponent;
