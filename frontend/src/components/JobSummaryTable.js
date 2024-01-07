import React from 'react';

const JobSummaryTable = ({ jobSummaries }) => {
  return (
    <div className="container mt-4 rounded bg-light p-4">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center" style={{ width: '70%' }}>Job Title</th>
            <th scope="col" className="text-center">Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobSummaries.map((summary, index) => (
            <tr key={index}>
              <td className="text-center">{summary.jobTitle}</td>
              <td className="text-center">{summary.averageSalary.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobSummaryTable;
