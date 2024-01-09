// EmployeeTable.js
import React from 'react';

const EmployeeTable = ({ employees }) => {
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th class="w-1/8 px-4 py-2">Id</th>
          <th class="w-1/8 px-4 py-2">Employee Name</th>
          <th class="w-1/8 px-4 py-2">Job Title</th>
          <th class="w-1/8 px-4 py-2">Salary</th>
        </tr>
      </thead>
      <tbody>
        { employees && employees.map((employee) => (
          <tr key={employee.id}>
            <td class="border px-4 py-2">{employee.id}</td>
            <td class="border px-4 py-2">{employee.employee_name}</td>
            <td class="border px-4 py-2">{employee.job_title}</td>
            <td class="border px-4 py-2">{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
