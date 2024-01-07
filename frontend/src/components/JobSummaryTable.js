// components/JobSummaryTable.js
import React from 'react';

const JobSummaryTable = ({ jobSummary }) => {
    return (
        <div className="max-w-screen-md mx-auto p-4">
            <table className=" min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Job Title</th>
                    <th className="py-2 px-4 border-b text-left">Average Salary</th>
                </tr>
                </thead>
                <tbody>
                {jobSummary.map((job) => (
                    <tr key={job.jobTitle}>
                        <td className="py-2 px-4 border-b">{job.jobTitle}</td>
                        <td className="py-2 px-4 border-b">{job.averageSalary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobSummaryTable;
