// components/ProcessingResults.js
import React from 'react';

const ProcessingResults = ({ employees, jobTitleResults }) => {
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.employeeName}</li>
        ))}
      </ul>
      <h2>Job Title Results</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobTitleResults.map((result, index) => (
            <tr key={index}>
              <td>{result.jobTitle}</td>
              <td>{result.averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessingResults;
