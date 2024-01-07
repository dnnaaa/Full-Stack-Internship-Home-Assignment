import React from 'react';

const JobSummary = ({ jobSummaries }) => {
  return (
    <div>
      <h2>Job Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {/* Display job title and average salary */}
          {jobSummaries.map((summary) => (
            <tr key={summary.jobTitle}>
              <td>{summary.jobTitle}</td>
              <td>{summary.averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobSummary;
