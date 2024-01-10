import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';

const perPage = 8;

const ProcessingResults = ({ employees, jobSummary }) => {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = page * perPage;
  const endIndex = startIndex + perPage;
  const currentEmployees = employees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(employees.length / perPage);

  return (
    <div>
      <h2>Employee Information</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentEmployees.map(({ id, name, job, salary }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{job}</TableCell>
                  <TableCell>{salary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={employees.length}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>

      <h2>Jobs Summary</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Job</TableCell>
                <TableCell>Average Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(jobSummary).map(([job, avgSalary]) => (
                <TableRow key={job}>
                  <TableCell>{job}</TableCell>
                  <TableCell>
                    {typeof avgSalary === 'number' ? avgSalary.toFixed(2) : avgSalary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ProcessingResults;
