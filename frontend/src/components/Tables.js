import React from 'react';
import EmployeeTable from './EmployeeTable';
import JobSummaryTable from './JobSummaryTable';

const Tables = ({ employees, jobSummary }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Employee Information</h2>
      <EmployeeTable employees={employees} />

      <h2 className="text-2xl font-bold text-blue-500 mt-8 mb-4">Jobs Summary</h2>
      <JobSummaryTable jobSummary={jobSummary} />
    </div>
  );
};

export default Tables;
