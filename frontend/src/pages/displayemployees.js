import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const slicedEmployees = employees.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(employees.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1)
  const [visiblePages, setVisiblePages] = useState([]);
  const maxVisiblePages = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9092/employees/all');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const updateVisiblePages = () => {
      const pages = numbers.slice(currentPage - 1, currentPage + maxVisiblePages - 1);
      setVisiblePages(pages);
    };
    updateVisiblePages();
  }, [currentPage, numbers, maxVisiblePages]);

   
  return (

    <div className="p-4 rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">List of Employees</h2>
   
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th>id</th>
            <th>employee_name</th>
            <th>job_title</th>
            <th>salary</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {slicedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300 rounded-lg">{employee.id}</td>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300 rounded-lg">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300 rounded-lg">{employee.job}</td>
              <td className="px-6 py-4 whitespace-nowrap border border-gray-300 rounded-lg">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
      <ul className="flex pl-0 rounded list-none flex-wrap">
      <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-200">
        <a href="#" className="page-link" onClick={perPage}>
          Prev
        </a>
      </li>
      {visiblePages.map((n, i) => (
        <li
          key={i}
          className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 hover:bg-blue-200 ${
            currentPage === n ? 'bg-blue-500 text-white' : ''
          }`}
        >
          <a href="#" className="page-link" onClick={() => changeCPage(n)}>
            {n}
          </a>
        </li>
      ))}
      <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-blue-200">
        <a href="#" className="page-link" onClick={nextPage}>
          Next
        </a>
      </li>
    </ul>
  </nav>
    </div>
  );

function nextPage(){
  if(currentPage !== nPage){
    setCurrentPage(currentPage + 1)
  }
}

function changeCPage(id){
  setCurrentPage(id)
}

function perPage(){
  if(currentPage !== 1){
    setCurrentPage(currentPage - 1)
  }
}

};

export default DisplayEmployees;
