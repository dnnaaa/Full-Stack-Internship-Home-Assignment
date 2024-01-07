
import React from 'react';

const EmployeeTable = ({ employees }) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(employees).map((jobTitle) => (
            employees[jobTitle].map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.salary}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;