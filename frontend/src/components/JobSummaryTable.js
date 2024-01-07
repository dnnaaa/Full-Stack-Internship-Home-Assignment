import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const JobSummaryTable = ({ jobSummary }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const entries = Object.entries(jobSummary);
  const offset = currentPage * itemsPerPage;
  const currentJobSummary = entries.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="mt-8">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">Job Title</th>
            <th className="py-2 px-4">Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentJobSummary.map(([jobTitle, averageSalary]) => (
            <tr key={jobTitle} className="border-t border-gray-300">
              <td className="py-2 px-4">{jobTitle}</td>
              <td className="py-2 px-4">{averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
  pageCount={Math.ceil(entries.length / itemsPerPage)}
  pageRangeDisplayed={0}
  marginPagesDisplayed={0}
  onPageChange={handlePageClick}
  containerClassName="pagination flex justify-center items-center list-none mt-4"
  activeClassName="bg-blue-500 text-white border border-blue-500 px-3 py-2 rounded"
  previousClassName="mr-2 border border-gray-300 px-3 py-2 rounded"
  nextClassName="ml-2 border border-gray-300 px-3 py-2 rounded"
  previousLabel="Previous"
  nextLabel="Next"
/>

    </div>
  );
};

export default JobSummaryTable;
