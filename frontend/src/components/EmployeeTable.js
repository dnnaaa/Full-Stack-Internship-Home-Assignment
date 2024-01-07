import React, { useState } from 'react';

const ITEMS_PER_PAGE = 10;

const EmployeeTable = ({ employees }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container mt-4 rounded bg-light p-4">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="text-center" style={{ width: '15%' }}>ID</th>
            <th className="text-center" style={{ width: '25%' }}>Name</th>
            <th className="text-center" style={{ width: '40%' }}>Job Title</th>
            <th className="text-center" style={{ width: '20%' }}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td className="text-center">{employee.id}</td>
              <td className="text-center">{employee.employeeName}</td>
              <td className="text-center">{employee.jobTitle}</td>
              <td className="text-center">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center mt-3">
        <button className="btn btn-secondary mr-1" onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {currentPage > 1 && (
          <button className="btn btn-primary mr-1" onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}
        <button className="btn btn-primary mr-1" disabled>
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button className="btn btn-primary mr-1" onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}
        <button className="btn btn-secondary" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;