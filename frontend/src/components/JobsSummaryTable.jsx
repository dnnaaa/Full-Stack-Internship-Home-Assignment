import React from 'react';

const JobsSummaryTable = ({ jobSummary }) => {
  console.log('Received jobSummary:', jobSummary);
  return (
    <table>
      <thead>
        <tr>
          <th className="w-1/8 px-4 py-2">Job Title</th>
          <th className="w-1/8 px-4 py-2">Average Salary</th>
        </tr>
      </thead>
      <tbody>
      {jobSummary && jobSummary.map((summary, index) => (
  <tr key={index}>
    
    <td className="border px-4 py-2">{Object.keys(summary)[0]}</td>
   
    <td className="border px-4 py-2">{Object.values(summary)[0]}</td>
  </tr>
))}
      </tbody>
    </table>
  );
};

export default JobsSummaryTable;
