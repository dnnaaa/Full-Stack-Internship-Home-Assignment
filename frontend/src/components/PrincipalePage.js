import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [jobTitleAvgSalaries, setJobTitleAvgSalaries] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 5;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const CustomButton = styled(Button)({
    backgroundColor: 'blue !important',
    '&:hover': {
      backgroundColor: 'darkblue',
    },
  });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/employees/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEmployees(response.data.employees || []);
      setJobTitleAvgSalaries(response.data.jobTitleAvgSalaries || {});
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const displayEmployees = employees.slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <CustomButton variant="contained" color="secondary" onClick={handleUpload}>
          Process
        </CustomButton>
      )}

      {/* Employees table */}
      <TableContainer style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '20px' }}>
        <Table style={{ border: '1px solid #ddd' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Job Title</TableCell>
              <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.id}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.employee_name}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.job_title}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{employee.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[recordsPerPage]}
        component="div"
        count={employees.length}
        rowsPerPage={recordsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        style={{ borderBottom: '2px solid black', marginBottom: '20px' }}
      />

      {/* Job Title and Average Salary table */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer style={{ maxWidth:'400', overflow: 'auto' }}>
          <Table style={{ border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell style={{ border: '1px solid #ddd', fontWeight: 'bold' }}>Average Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(jobTitleAvgSalaries).map(([jobTitle, avgSalary]) => (
                <TableRow key={jobTitle}>
                  <TableCell style={{ border: '1px solid #ddd' }}>{jobTitle}</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' }}>{avgSalary.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UploadFile;
