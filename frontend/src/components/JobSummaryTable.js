import React, { useState } from 'react';

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
      <table className="job-summary-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Average Salary</th>
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
        .job-summary-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .job-summary-table th,
        .job-summary-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        .job-summary-table th {
          background-color: #3498db; /* Changement de la couleur d'arrière-plan */
          color: white;
        }

        .job-summary-table td {
          text-align: center; /* Centrage du texte dans les cellules */
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pagination button {
          margin: 0 5px;
          padding: 10px 15px;
          cursor: pointer;
          background-color: #3498db; /* Changement de la couleur d'arrière-plan */
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
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

export default JobSummaryTable;
