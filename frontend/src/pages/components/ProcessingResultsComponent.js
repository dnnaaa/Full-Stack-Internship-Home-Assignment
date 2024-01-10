import React, { useState } from "react";

const ProcessingResultsComponent = ({ employees, jobTitleAverages }) => {
  // Constants for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust number of items per page as needed
  const pageNumbers = [];
  const totalPages = employees.length;

  // Determine the page numbers to show
  let pagesToShow;
  if (totalPages <= 3) {
    // Less than or equal to 3 total pages
    pagesToShow = [1, 2, 3].slice(0, totalPages);
  } else if (currentPage === 1 || currentPage === 2) {
    // First or second page
    pagesToShow = [1, 2, 3];
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    // Last or second to last page
    pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    // Any other page
    pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
  }

  // Calculate the indexes for slicing the employees array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next or previous page
  const nextPage = () =>
    setCurrentPage((prev) => (prev + 1 > pageNumbers.length ? prev + 1 : prev));
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 < 1 ? prev : prev - 1));

  return (
    
    <div className="container">
    {employees.length != 0 && (
        <div>
      <div className="card text-center m-1 p-5 mt-4">
      
        <div className="card-head">
          <h5>List of employees</h5>
        </div> 
        <div className="card-body">
          <table className="table table-striped">
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
          <h5>Average Salary for Each Job Title</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped">
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

export default ProcessingResultsComponent;
