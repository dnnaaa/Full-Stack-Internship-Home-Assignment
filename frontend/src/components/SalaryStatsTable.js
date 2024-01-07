import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function SalaryStatsTable({ stats }) {
  const itemsPerPage = process.env.NEXT_PUBLIC_ITEMSPERPAGE;
  const [currentPage, setCurrentPage] = useState(1);

  //Sort by salary 
  const sortedData = [...stats].sort(
    (a, b) => b.averageSalary - a.averageSalary
  );

  // Calculate the total number of pages
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  // Calculate the start and end index of the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = parseInt(startIndex) + parseInt(itemsPerPage);
  // Slice the array to get items for the current page
  const currentItems = sortedData.slice(startIndex, endIndex);


  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(parseInt(value));
  };

  return (
    <>
      <h2>Job Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((stat) => (
            <tr key={stat.jobTitle}>
              <td>{stat.jobTitle}</td>
              <td>{stat.averageSalary.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Stack>
    </>
  );
}
