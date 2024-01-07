import EmployeeRow from "./EmployeeRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function EmployeeTable({ employees }) {
  const itemsPerPage = process.env.NEXT_PUBLIC_ITEMSPERPAGE;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const pageCount = Math.ceil(employees.length / itemsPerPage);

  // Calculate the start and end index of the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = parseInt(startIndex) + parseInt(itemsPerPage);
  // Slice the array to get items for the current page
  const currentItems = employees.slice(startIndex, endIndex);




  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(parseInt(value));
  };
  return (
    <>
      <h2>Employee Information</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((emp) => (
            <EmployeeRow key={emp.id} employee={emp} />
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
