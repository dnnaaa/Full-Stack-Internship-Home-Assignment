import { useState } from 'react';
import Papa from 'papaparse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

export default function Home() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [showTables, setShowTables] = useState(false);
  const [employeePage, setEmployeePage] = useState(0);
  const employeesPerPage = 10;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // const handleProcess = () => {
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       console.log('Parsed CSV:', results.data);
  //       setParsedData(results.data.slice(0, 20)); // Adjusting to use the first 20 employees
  //       setShowTables(true);
  //     },
  //     error: (error) => {
  //       console.error('CSV parsing error:', error);
  //     },
  //   });
  // };

  const handleProcess = () => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Parsed CSV:', results.data);
        setParsedData(results.data);
        setShowTables(true);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      },
    });
  };

  const handleEmployeePageChange = (event, newPage) => {
    setEmployeePage(newPage);
  };

  const calculateJobSummary = () => {
    const jobSummary = {};
    const jobCount = {};

    parsedData.forEach((employee) => {
      const jobTitle = employee.job_title;
      const salary = parseFloat(employee.salary);

      if (!jobSummary[jobTitle]) {
        jobSummary[jobTitle] = salary;
        jobCount[jobTitle] = 1;
      } else {
        jobSummary[jobTitle] += salary;
        jobCount[jobTitle]++;
      }
    });

    // Calculate average salary for each job title
    Object.keys(jobSummary).forEach((jobTitle) => {
      jobSummary[jobTitle] = jobSummary[jobTitle] / jobCount[jobTitle];
    });

    return jobSummary;
  };

  const jobSummary = calculateJobSummary();
  const maxJobLines = 10; 
  const [jobPage, setJobPage] = useState(0);

  const handleJobPageChange = (event, newPage) => {
    setJobPage(newPage);
  };

  // const displayedJobSummary = Object.keys(jobSummary).slice(jobPage * maxJobLines, (jobPage + 1) * maxJobLines);
  // const displayEmployees = parsedData.slice(employeePage * employeesPerPage, (employeePage + 1) * employeesPerPage);
  
  const displayEmployees = parsedData.slice(employeePage * employeesPerPage, (employeePage + 1) * employeesPerPage);
  const displayedJobSummary = Object.keys(jobSummary).slice(jobPage * maxJobLines, (jobPage + 1) * maxJobLines);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-8">CSV Parser</h1>

      {/* File upload */}
      <div className="text-center mb-4">
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4 p-2 border border-gray-300 rounded" />
        {file && (
          <button onClick={handleProcess} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Process File
          </button>
        )}
      </div>

      {/* Display Tables after processing file */}
      {showTables && (
        <div className="w-full max-w-2xl overflow-x-auto mb-8">
          {/* Employees Table */}
          <h2 className="text-2xl mb-2">Employees Table</h2>
          <TableContainer className="border border-gray-300 rounded">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="bg-gray-200">ID</TableCell>
                  <TableCell className="bg-gray-200">Employee Name</TableCell>
                  <TableCell className="bg-gray-200">Job Title</TableCell>
                  <TableCell className="bg-gray-200">Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.employee_name}</TableCell>
                    <TableCell>{employee.job_title}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[employeesPerPage]}
            component="div"
            count={parsedData.length}
            rowsPerPage={employeesPerPage}
            page={employeePage}
            onPageChange={handleEmployeePageChange}
            className="mt-4"
          />



          {/* Job Summary Table */}
          <h2 className="text-2xl mt-6 mb-2">Job Summary Table</h2>
          <TableContainer className="border border-gray-300 rounded">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bg-gray-200">Job Title</TableCell>
                <TableCell className="bg-gray-200">Average Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedJobSummary.map((jobTitle) => (
              <TableRow key={jobTitle}>
                <TableCell>{jobTitle}</TableCell>
                <TableCell>{jobSummary[jobTitle]}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          </TableContainer>
            <TablePagination
              rowsPerPageOptions={10}
              component="div"
              count={Object.keys(jobSummary).length}
              rowsPerPage={maxJobLines}
              page={jobPage}
              onPageChange={handleJobPageChange}
              className="mt-4"
            />
        </div>
      )}
    </div>
  );
}
