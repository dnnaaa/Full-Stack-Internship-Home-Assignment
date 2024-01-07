// JobSummaryTable.js

import React, { useState } from 'react';
import styles from './styles/JobSummaryTable.module.css';

const JobSummaryTable = ({ jobSummary }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const jobSummaryData = jobSummary.map((item) => {
    const [position, averageSalary] = item.split(':');
    return { position: position.trim(), averageSalary: parseFloat(averageSalary.trim()) };
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, jobSummaryData.length);

  const currentJobSummary = jobSummaryData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(jobSummaryData.length / itemsPerPage);

  const renderTableRows = () => {
    return currentJobSummary.map((summary) => (
      <tr key={summary.position}>
        <td>{summary.position}</td>
        <td>{summary.averageSalary.toFixed(2)}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Job Summary Table</h2>
      <table className={styles['job-summary-table']}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <div className={styles.pagination}>
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
    </div>
  );
};

export default JobSummaryTable;
