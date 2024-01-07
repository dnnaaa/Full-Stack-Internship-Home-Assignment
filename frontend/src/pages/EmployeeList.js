import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <div>
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
          {/* Display paginated list of employees */}
          {employees.map((employee) => (
            <tr key={employee.name}>
              <td>{employee.name}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
