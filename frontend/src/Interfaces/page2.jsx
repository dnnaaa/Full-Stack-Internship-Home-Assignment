import React, { useState } from "react";

const Processing = ({ employees, jobTitleAverages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pagesToShow =
    totalPages <= 3
      ? pageNumbers
      : currentPage === 1 || currentPage === 2
      ? pageNumbers.slice(0, 3)
      : currentPage === totalPages || currentPage === totalPages - 1
      ? pageNumbers.slice(-3)
      : [currentPage - 1, currentPage, currentPage + 1];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () =>
    setCurrentPage((prev) => (prev + 1 > totalPages ? prev : prev + 1));
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 < 1 ? prev : prev - 1));

  return (
    <div className="container">
      {employees.length !== 0 && (
        <div>
          <div className="card text-center m-1 p-5 mt-4">
            <div className="card-head">
              <h4 className="text-primary">List of employees</h4>
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
                    <a
                      onClick={prevPage}
                      href="#!"
                      className="page-link"
                      disabled={currentPage === 1}
                    >
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
                    <a
                      onClick={nextPage}
                      href="#!"
                      className="page-link"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="card text-center m-1 p-5 mt-4">
            <div className="card-head">
              <h4 className="text-primary">Average Salary for Each Job Title</h4>
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

export default Processing;