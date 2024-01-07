import React, { useState, useEffect } from 'react';

const EmployeeTable = ({ employees }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 10;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageEmployees = employees.slice(startIndex, endIndex);

    return (
        <div className="max-w-screen-md mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Employee Name</th>
                    <th className="py-2 px-4 border-b">Job Title</th>
                    <th className="py-2 px-4 border-b">Salary</th>
                </tr>
                </thead>
                <tbody>
                {currentPageEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                        <td className="py-2 px-4">{employee.id}</td>
                        <td className="py-2 px-4">{employee.employee_name}</td>
                        <td className="py-2 px-4">{employee.job_title}</td>
                        <td className="py-2 px-4">{employee.salary}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="py-2 px-4 bg-500 text-black rounded hover:bg-transparent cursor-pointer focus:outline-none"
                >
                    Previous
                </button>
                <span className="py-2 px-4 text-gray-700">{`Page ${currentPage}`}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= employees.length}
                    className="py-2 px-4 bg-500 text-black rounded hover:bg-transparent cursor-pointer focus:outline-none"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeTable;
