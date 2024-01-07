
import React from 'react';

const JobSummaryTable = ({ employeesByJobTitle }) => {

  const jobSummary = {};
  
  console.log(employeesByJobTitle)

  Object.keys(employeesByJobTitle).forEach((jobTitle) => {
    console.log(jobTitle)
    const employees = employeesByJobTitle[jobTitle];
    const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
    const averageSalary = totalSalary / employees.length;
    jobSummary[jobTitle] = averageSalary;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Average Salary</th>
        </tr>
      </thead>
      <tbody>
        {Object?.keys(jobSummary).map((jobTitle, index) => (
          <tr key={index}>
            <td>{jobTitle}</td>
            <td>{jobSummary[jobTitle]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobSummaryTable;