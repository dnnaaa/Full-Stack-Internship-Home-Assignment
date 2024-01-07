import React from 'react';

const JobSummary = ({ jobsummaries }) => {
    return (
      <div className='container m-5'>
        <table className='table table-dark text-dark'>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {jobsummaries.map((summary) => (
              <tr key={summary.jobTitle}>
                <td>{summary.jobTitle}</td>
                <td>{parseFloat(summary.avgSalary.toFixed(2))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default JobSummary;