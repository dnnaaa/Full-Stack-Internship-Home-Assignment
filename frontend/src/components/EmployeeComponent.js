import React, { useState } from 'react';
import {getPaginationGroup} from "@/helpers/Utils";

const EmployeeComponent = ({ employees, pageSize = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalEmployees = employees.length;
    const totalPages = Math.ceil(totalEmployees / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const selectedEmployees = employees.slice(startIndex, startIndex + pageSize);
    const windowSize = 5;

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationGroup = getPaginationGroup(currentPage, windowSize, totalPages);

    return (
        <div className="m-10 p-5 border border-gray-200">
            <h2 className="text-lg font-semibold">Employees</h2>
            <div className="mt-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-b-2">ID</th>
                        <th className="px-4 py-2 border-b-2">Name</th>
                        <th className="px-4 py-2 border-b-2">Position</th>
                        <th className="px-4 py-2 border-b-2">Salary (MAD)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedEmployees.map((employee, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{employee.id}</td>
                            <td className="px-4 py-2 border-b">{employee.employeeName}</td>
                            <td className="px-4 py-2 border-b">{employee.jobTitle}</td>
                            <td className="px-4 py-2 border-b">{employee.salary}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <nav className="mt-3" aria-label="Page navigation example">
                <ul className="list-style-none flex justify-center">
                    <li>
                        <a className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all 
                            duration-300 hover:bg-neutral-100 ${currentPage === 1 ? 'pointer-events-none text-neutral-500' : 
                            'cursor-pointer'}`} onClick={() => currentPage > 1 && goToPage(currentPage - 1)}>
                            Previous</a>
                    </li>
                    {currentPage > 1 + windowSize && (
                        <>
                            <li>
                                <a className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600
                                   transition-all duration-300 hover:bg-neutral-100 cursor-pointer"
                                   onClick={() => goToPage(1)}>1</a>
                            </li>
                            <li><span>…</span></li>
                        </>
                    )}
                    {paginationGroup.map((pageNumber) => (
                        <li key={pageNumber}>
                            <a
                                className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 
                                ${currentPage === pageNumber ? 'bg-blue-100 border border-blue-500 text-blue-700' : 
                                'bg-transparent text-neutral-600 hover:bg-neutral-100 cursor-pointer'}`}
                                onClick={() => goToPage(pageNumber)}
                            >
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                    {currentPage < totalPages - windowSize && (
                        <>
                            <li><span>…</span></li>
                            <li>
                                <a className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600
                                transition-all duration-300 hover:bg-neutral-100 cursor-pointer"
                                   onClick={() => goToPage(totalPages)}>{totalPages}</a>
                            </li>
                        </>
                    )}

                    <li>
                        <a className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all 
                        duration-300 hover:bg-neutral-100 ${currentPage === totalPages ? 'pointer-events-none text-neutral-500' : 
                            'cursor-pointer'}`} onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}>
                            Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default EmployeeComponent;