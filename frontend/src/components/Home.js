import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [averageSalaries, setAverageSalaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/files/employees');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchAverageSalaries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/files/averageSalary');
        setAverageSalaries(response.data);
      } catch (error) {
        console.error('Error fetching average salaries:', error);
      }
    };

    fetchData();
    fetchAverageSalaries();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Interface 3</h2>

      <Link to="/fileupload">
        <Button variant="primary" style={{ marginBottom: '20px' }}>
          Upload
        </Button>
      </Link>

      <Table striped bordered hover style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.employeeName}</td>
              <td>{item.jobTitle}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination style={{ justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
            style={{ cursor: 'pointer' }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Table striped bordered hover variant="dark" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(averageSalaries).map(([jobTitle, averageSalary]) => (
            <tr key={jobTitle}>
              <td>{jobTitle}</td>
              <td>{`$${averageSalary.toFixed(2)}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
