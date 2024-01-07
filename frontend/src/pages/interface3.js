import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Interface3 = () => {
    const [employees, setEmployees] = useState([]);
    const [averageSalaries, setAverageSalaries] = useState({});
    const router = useRouter();
    const { fileName } = router.query;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/test/parse-csv?filePath=${fileName}`);
        const data = await response.json();
        setEmployees(data.employees);
        setAverageSalaries(data.averageSalaries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '10px',
      };
      
      const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
      };
      
      const tdStyle = {
        padding: '8px',
        borderBottom: '1px solid #ddd',
      }; 
    useEffect(() => {
      fetchData();
    }, []);
    
    return (
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
        <h2>Employee Information</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Job Title</th>
              <th style={thStyle}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.employeId}>
                <td style={tdStyle}>{employee.employeId}</td>
                <td style={tdStyle}>{employee.name}</td>
                <td style={tdStyle}>{employee.jobTitle}</td>
                <td style={tdStyle}>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div style={{ flex: 1 }}>
        <h2>Jobs Summary</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Job Title</th>
              <th style={thStyle}>Average Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(averageSalaries).map(([jobTitle, averageSalary]) => (
              <tr key={jobTitle}>
                <td style={tdStyle}>{jobTitle}</td>
                <td style={tdStyle}>{averageSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
};

export default Interface3;