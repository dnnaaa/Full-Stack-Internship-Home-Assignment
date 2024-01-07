import { useState } from 'react';

const EmployeeTable = ({ employees }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6);
  
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const pageCount = Math.ceil(employees.length / employeesPerPage);
    const maxPageNumberLimit = 3;
    const minPageNumberLimit = 0;

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 border-[1px] rounded-lg w-[90%] xl:w-[90rem] ">
        <thead className="bg-gray-50"> 
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.employeeName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.jobTitle}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 list-none rounded my-2">
            <li className={`relative block py-2 px-3 leading-tight ${currentPage === 1 ? 'cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage !== 1) paginate(currentPage - 1) }}>Prev</a>
            </li>
            {[...Array(pageCount).keys()].slice(minPageNumberLimit, maxPageNumberLimit).map(number => (
              <li key={number} className={`relative block py-2 px-3 leading-tight ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); paginate(number + 1) }}>
                  {number + 1}
                </a>
              </li>
            ))}
            <li className={`relative block py-2 px-3 leading-tight ${currentPage === pageCount ? 'cursor-not-allowed' : 'bg-white hover:bg-gray-200'}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); if (currentPage !== pageCount) paginate(currentPage + 1) }}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default EmployeeTable;
