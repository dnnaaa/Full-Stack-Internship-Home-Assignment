import React, { useState } from "react";

const Processing = ({ employees, jobTitleAverages }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const pageNumbers = [];
  const totalPages = employees.length;


  let pagesToShow;
  if (totalPages <= 3) { 
    pagesToShow = [1, 2, 3].slice(0, totalPages);
  } else if (currentPage === 1 || currentPage === 2) {
    pagesToShow = [1, 2, 3];
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(employees)
    ? employees.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) => (prev + 1 > pageNumbers.length ? prev : prev + 1));
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 < 1 ? prev : prev - 1));

  return (
    
    <div className="container">
    {employees.length != 0 && (
        <div>
      <div className="card text-center m-1 p-5 mt-4">
      
        <div className="card-head">
          <h5 className="text-primary">List of employees</h5>
        </div> 
        <div className="card-body">
          <table className="table">
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
                  <td>{employee.name}</td>
                  <td>{employee.jobTitle}</td>
                  <td>${employee.salary.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a onClick={() => prevPage()} href="#!" className="page-link">
                  Prev
                </a>
              </li>
              {pagesToShow.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <a
                    onClick={() => paginate(number)}
                    href="#!"
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a onClick={() => nextPage()} href="#!" className="page-link">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="card text-center m-1 p-5 mt-4">
        <div className="card-head">
          <h5 className="text-primary">Average Salary for Each Job Title</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(jobTitleAverages).map(
                ([jobTitle, averageSalary]) => (
                  <tr key={jobTitle}>
                    <td>{jobTitle}</td>
                    <td>${averageSalary.toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default Processing;
