import React from "react";
import { useState } from "react";

const EmployeeTable = ({ employees }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <table className="table-auto text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Job Title</th>
            <th className="p-2">Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id} className="bg-white border-b ">
              <td className="p-2">{employee.id}</td>
              <td className="p-2">{employee.name}</td>
              <td className="p-2">{employee.jobTitle}</td>
              <td className="p-2">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-center justify-between mt-8">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {indexOfFirstItem + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900">
            {Math.min(indexOfLastItem, employees.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {employees.length}
          </span>{" "}
          Employees
        </span>
        <div className="inline-flex space-x-2 m-5">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              class="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
