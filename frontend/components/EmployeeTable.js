// EmployeeTable.js

import React, { useState, useEffect } from 'react';
import styles from './styles/EmployeeTable.module.css';

const EmployeeTable = ({ employees, currentPage, setCurrentPage }) => {
  const itemsPerPage = 5;
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

  const renderPaginationButtons = () => {
    const totalButtonsToShow = 5;
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? styles.active : ''}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        {buttons.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Employee Table</h2>
      <table className={styles['employee-table']}>
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

      {renderPaginationButtons()}
    </div>
  );
};

export default EmployeeTable;
