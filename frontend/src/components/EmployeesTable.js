import React from 'react';

const EmployeesTable = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }
  return (
    <div style={{ overflowX: 'auto', textAlign: 'center' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Job Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.job.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
