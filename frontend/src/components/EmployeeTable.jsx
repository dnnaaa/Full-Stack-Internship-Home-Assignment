import React from "react";

const EmployeeTable = ({ employees }) => {
  return (
    <div className="flex flex-col w-auto">
      <div className="block bg-transperant m-4 p-4 w-full h-80 overflow-auto">
        <table className="w-full border border-solide text-center">
          <thead>
            <tr className="border border-solide bg-gray-700">
              <th className="text-md px-6 py-3">ID</th>
              <th className="text-md px-6 py-3">Name</th>
              <th className="text-md px-6 py-3">Job Title</th>
              <th className="text-md px-6 py-3">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="border-b" key={employee.id}>
                <td className="text-md px-6 py-3">{employee.id}</td>
                <td className="text-md px-6 py-3">{employee.name}</td>
                <td className="text-md px-6 py-3">{employee.job}</td>
                <td className="text-md px-6 py-3">{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
