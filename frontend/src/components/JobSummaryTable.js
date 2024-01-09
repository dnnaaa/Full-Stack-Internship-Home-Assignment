import React from "react";

const JobSummaryTable = ({ jobSummary }) => {
  return (
    <table className="table-auto text-sm text-left rtl:text-right text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="p-2">Job Title</th>
          <th className="p-2">Average Salary</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jobSummary).map(([jobTitle, averageSalary]) => (
          <tr key={jobTitle} className="bg-white border-b">
            <td className="p-2">{jobTitle}</td>
            <td className="p-2">{averageSalary.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobSummaryTable;
