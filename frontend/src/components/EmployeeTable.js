import React, { useState, useEffect } from 'react';

const EmployeeTable = ({ employees, currentPage, setCurrentPage }) => {
  const itemsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(Math.min(currentPage * itemsPerPage, employees.length));
  }, [currentPage, employees.length, itemsPerPage]);

  const renderTableRows = () => {
    return employees.slice(startIndex, endIndex).map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.jobTitle}</td>
        <td>{employee.salary}</td>
      </tr>
    ));
  };

  return (
    <div className="employee-table-container">
      <h2 className="table-title">Employee Data</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>

      <style jsx>{`
        .employee-table-container {
          margin-top: 20px;
        }

        .table-title {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .custom-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
          margin-top: 10px;
        }

        .custom-table th,
        .custom-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        .custom-table th {
          background-color: #3498db;
          color: white;
        }

        .pagination {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pagination button {
          margin: 0 5px;
          padding: 12px 18px;
          cursor: pointer;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
        }

        .pagination span {
          margin: 0 5px;
          font-size: 16px;
          color: #333;
        }

        .pagination button:disabled {
          background-color: #ddd;
          color: #666;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default EmployeeTable;
