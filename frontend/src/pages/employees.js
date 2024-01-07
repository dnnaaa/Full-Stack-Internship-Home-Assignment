import React, { useState, useEffect } from 'react';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/employees?page=${page}&size=${pageSize}`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.content);
          setTotalPages(data.totalPages);
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset page when changing page size
  };

  return (
    <div>
      <h1>Employee Table</h1>
      <label>
        Page Size:
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employeeName}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <span>Page: {page}</span>
        <div className="pagination">
        <button
          className="pagination-button"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
