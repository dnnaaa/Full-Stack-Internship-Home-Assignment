import React, { useState } from 'react';
import { useFileContext } from '../context/FileContext';

const Interface3 = () => {
  const { processingResults } = useFileContext();
  const itemsPerPage = 10; // Adjust the number of items per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  // Check if processingResults is null
  if (!processingResults) {
    return null;
  }

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Check if employees is null
  const employeesData = processingResults.employees?.slice(indexOfFirstItem, indexOfLastItem) || [];
  
  // Convert avgSalary object to an array of objects
  const averageData = Object.entries(processingResults.avgSalary || {})
    .map(([jobTitle, salary]) => ({ jobTitle, salary }));

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil((processingResults.employees?.length || 0) / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPageCount = Math.ceil((processingResults.employees?.length || 0) / itemsPerPage);

  // Generate an array of page numbers to display
  const pageNumbers = [];
  const maxPageButtons = 3; // Adjust the number of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPageCount, startPage + maxPageButtons - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <main>

      <div key={processingResults.id} className="card">
        <h3>{processingResults.title}</h3>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Employee Name</th>
                      <th>Job Title</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesData.map((item) => (
                      <tr key={item.id} className="border-b dark:border-neutral-500">
                        {/* Render table rows */}
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.employeeName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.jobTitle}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination controls with "Prev", page numbers, and "Next" */}
          <div className="flex justify-center mt-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-400 text-white py-2 px-4 rounded-l"
            >
              Prev
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`bg-gray-400 text-white py-2 px-4 ${pageNumber === currentPage ? 'font-bold' : ''}`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPageCount}
              className="bg-gray-400 text-white py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div key={processingResults.id} className="card mt-4">
        <h3>{processingResults.title}</h3>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Average Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {averageData.map((item, index) => (
                      <tr key={index} className="border-b dark:border-neutral-500">
                        {/* Render table rows */}
                        <td className="whitespace-nowrap px-6 py-4">{item.jobTitle}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interface3;
