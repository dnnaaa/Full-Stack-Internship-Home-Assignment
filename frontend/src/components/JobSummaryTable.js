
import { useState } from 'react';

const JobSummaryTable = ({ summary }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const maxPageNumberLimit = 3; 
    const minPageNumberLimit = 0;
  
    const pageCount = Math.ceil(summary.length / itemsPerPage);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = summary.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full leading-normal border-[1px] rounded-lg w-[90%] xl:w-[90rem]">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Average Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems .map(( currentItem) => (
              <tr key={currentItem.jobTitle}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{currentItem.jobTitle}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"> {currentItem.avgSalary.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-2">
        <nav className="block">
          <ul className="flex pl-0 list-none rounded my-2 justify-start">
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
  
  export default JobSummaryTable;
  