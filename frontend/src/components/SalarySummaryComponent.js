import React, { useState } from 'react';
import {getPaginationGroup} from "@/helpers/Utils";

const SalarySummaryComponent = ({ salarySummary }) => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalSalaries = Object.keys(salarySummary).length;
    const totalPages = Math.ceil(totalSalaries / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedSalarySummary = Object.entries(salarySummary)
        .slice(startIndex, startIndex + pageSize);

    const windowSize = 5;

    const goToPage = (pageNumber, event) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const paginationGroup = getPaginationGroup(currentPage, windowSize, totalPages);

    return (
        <div className="m-10 p-5 border border-gray-200">
            <h2 className="text-lg font-semibold">Salary Summary</h2>
            <div className="mt-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-b-2">Job Title</th>
                        <th className="px-4 py-2 border-b-2">Average Salary (MAD)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedSalarySummary.map(([jobTitle, salaryData]) => (
                        <tr key={jobTitle} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b-2">{jobTitle}</td>
                            <td className="px-4 py-2 border-b-2">{salaryData.averageSalary.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <nav className="mt-3" aria-label="Page navigation">
                    <ul className="flex justify-center list-style-none">
                        {currentPage > 1 && (
                            <li>
                                <a
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600
                                    transition-all duration-300 hover:bg-neutral-100 cursor-pointer"
                                    onClick={(e) => goToPage(currentPage - 1, e)}>
                                    Previous</a>
                            </li>
                        )}
                        {paginationGroup.map((pageNumber) => (
                            <li key={pageNumber}>
                                <a
                                   className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 
                                   ${currentPage === pageNumber ? 'bg-blue-100 border border-blue-500 text-blue-700' : 
                                       'bg-transparent text-neutral-600 hover:bg-neutral-100 cursor-pointer'}`}
                                   onClick={(e) => goToPage(pageNumber, e)}
                                >
                                    {pageNumber}
                                </a>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li>
                                <a
                                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600
                                    transition-all duration-300 hover:bg-neutral-100 cursor-pointer"
                                    onClick={(e) => goToPage(currentPage + 1, e)}>
                                    Next</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SalarySummaryComponent;
