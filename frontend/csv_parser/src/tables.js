import React, { useState } from 'react';
import './tables.css';

const Tables = ({ employees, averageSalaries }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSummary, setCurrentPageSummary] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEmployees = employees.slice(startIndex, endIndex);

    const startIndexSummary = (currentPageSummary - 1) * 4;
    const endIndexSummary = startIndexSummary + 4;
    const currentSummaryEntries = Object.entries(averageSalaries).slice(startIndexSummary, endIndexSummary);



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handlePageChange2 = (pageNumber) => {
        setCurrentPageSummary(pageNumber);
    };
    return (
        <div className="tables-container">
            <h2>Employee Information</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.jobTitle}</td>
                            <td>{employee.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(1)}>1</button>
                <button onClick={() => handlePageChange(2)}>2</button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}>
                    Next
                </button>
            </div>

            <h2>Jobs Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Average Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSummaryEntries.map(([jobTitle, avgSalary]) => (
                        <tr key={jobTitle}>
                            <td>{jobTitle}</td>
                            <td>{avgSalary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange2(currentPageSummary - 1)} disabled={currentPageSummary === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange2(1)}>1</button>
                <button onClick={() => handlePageChange2(2)}>2</button>
                <button onClick={() => handlePageChange2(currentPage + 1)} disabled={currentPage === Math.ceil(Object.keys(averageSalaries).length / 4)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Tables;
