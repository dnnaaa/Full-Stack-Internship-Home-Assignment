import React from "react";

const JobSummaryTable = ({ jobSummary }) => {
  return (
    < table className = "table-auto shadow-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 " >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="p-2">Job Title</th>
          <th className="p-2">Average Salary</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(jobSummary).map((jobTitle) => (
          <tr key={jobTitle} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
            <td className="p-2">{jobTitle}</td>
            <td className="p-2">
              {jobSummary[jobTitle].averageSalary.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobSummaryTable;