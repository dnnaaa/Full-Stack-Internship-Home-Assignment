import React from "react";

export default function EmployeeRow({ employee }) {
  const { name, jobTitle, salary } = employee;

  return (
    <tr>
      <td>{name}</td>
      <td>{jobTitle}</td>
      <td>{salary}</td>
    </tr>
  );
}
