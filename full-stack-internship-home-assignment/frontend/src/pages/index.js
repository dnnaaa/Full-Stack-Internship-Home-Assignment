import 'tailwindcss/tailwind.css';
import FileUpload from '../components/FileUpload';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 10; // Adjust as needed

const Home = () => {
  const [results, setResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/csv/parse', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setCurrentPage(0);
      } else {
        console.error('Failed to parse CSV file.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const pageCount = results ? Math.ceil(results.employees.length / ITEMS_PER_PAGE) : 0;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedEmployees = results
    ? results.employees.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    : [];

  return (
    <div>
        <h1 className="text-center display-6">DNA Engineering Full-Stack Assignment</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {results && (
        <div>
          <h2>Employee Information</h2>
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Job Title</th>
                <th scope="col">Salary</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                pageLinkClassName="page-link"
                breakLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                disabledClassName="disabled"
                breakClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                pageClassName="page-item"
              />
            </ul>
          </nav>

          <h2>Jobs Summary</h2>
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Job Title</th>
                <th scope="col">Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.jobTitleAverages).map(([jobTitle, averageSalary], index) => (
                <tr key={index}>
                  <td>{jobTitle}</td>
                  <td>{averageSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
