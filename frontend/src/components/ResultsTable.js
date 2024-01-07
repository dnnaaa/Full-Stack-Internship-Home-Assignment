import React, { useState } from 'react';

const ResultsTable = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.employees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeItemsPerPage = (newSize) => {
    setCurrentPage(1);
    setItemsPerPage(newSize);
  };

  const totalPages = Math.ceil(results.employees.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayPageNumbers = () => {
    if (totalPages <= 10) {
      return pageNumbers;
    }

    const maxPagesToShow = 10;
    const middlePage = Math.floor(maxPagesToShow / 2);

    if (currentPage <= middlePage) {
      return [...pageNumbers.slice(0, maxPagesToShow), '...'];
    } else if (currentPage >= totalPages - middlePage) {
      return ['...', ...pageNumbers.slice(totalPages - maxPagesToShow)];
    } else {
      const startPage = currentPage - middlePage;
      const endPage = currentPage + middlePage - 1;
      return ['...', ...pageNumbers.slice(startPage, endPage), '...'];
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-heading">Employee Information</h2>
      <div className="items-per-page">
        <select
          value={itemsPerPage}
          onChange={(e) => changeItemsPerPage(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employeeName}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-4">
        <button
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {displayPageNumbers().map((number, index) => (
          <button
            key={index}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${currentPage === number ? 'bg-gray-400' : ''}`}
            onClick={() => (number !== '...' ? paginate(number) : null)}
          >
            {number}
          </button>
        ))}
        <button
          className={`bg-gray-300 hover.bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${indexOfLastItem >= results.employees.length ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= results.employees.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;
