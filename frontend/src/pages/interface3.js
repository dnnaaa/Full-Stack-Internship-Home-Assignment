import React, { useState, useEffect } from 'react';

const Interface3 = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [jobSummaryData, setJobSummaryData] = useState([]);

  useEffect(() => {
    // Fetch employee data from backend
    fetch('http://localhost:8080/employees/process-csv')
      .then(response => response.json())
      .then(data => setEmployeeData(data));

    // Fetch job summary data from backend
    fetch('http://localhost:8080/employees/average-salaries')
      .then(response => response.json())
      .then(data => setJobSummaryData(data));
  }, []);


  // Render job summary table

  return (
    <div>
      {/* Employee table */
      employeeData.map((employee, index) => (
        <div key={index}>
            <p>{employee.Name}</p>
            <p>{employee.JobTitle}</p>
            <p>{employee.salary}</p>
        </div>
    ))}
      {/* Jobs Summary table */
      jobSummaryData.map((job, index) => (
        <div key={index}>
            <p>{job.JobTitle}</p>
            <p>{job.AverageSalary}</p>
        </div>
    ))}
    </div>
  );
};

export default Interface3;
