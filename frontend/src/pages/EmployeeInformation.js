import React, { useState } from 'react';

const EmployeeInformation = ({ employees }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div  className='container m-5'>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
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

      <div className='float-end'>
        <button className="btn btn-dark m-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>  {currentPage} of {totalPages} </span>
        <button className='btn btn-dark  m-3' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeInformation;
