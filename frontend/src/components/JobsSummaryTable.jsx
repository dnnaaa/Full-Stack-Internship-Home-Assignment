import React from "react";

const JobsSummaryTable = ({ jobsSummaries }) => {
  return (
    <div className="flex flex-col w-auto">
      <div className="block bg-transperant m-4 p-4 w-full h-64 overflow-auto">
        <table className="w-full border border-solide text-center">
          <thead>
            <tr className="border border-solide bg-gray-700">
              <th className="text-md px-6 py-3">Job Title</th>
              <th className="text-md px-6 py-3">Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {jobsSummaries.map((jobsSummary, index) => (
              <tr className="border-b" key={index}>
                <td className="text-md px-6 py-3">{jobsSummary.job}</td>
                <td className="text-md px-6 py-3">{jobsSummary.averageSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsSummaryTable;
