import React from 'react';

export default function DisplayResults({ processingResults }) {
    const { employees, jobSummary } = processingResults;

    const tableStyle = {
        width: '100%',
        textAlign: 'center',
    };

    const h2Style = {
        fontSize: '1.5rem',
        textAlign: 'center'
    };
    const thTdStyle = {
        border: '1px solid #dddddd',
        padding: '8px',
    };

    return (
        <div>
            <h2 style={h2Style}>Employee Information</h2>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thTdStyle}>ID</th>
                    <th style={thTdStyle}>Name</th>
                    <th style={thTdStyle}>Job Title</th>
                    <th style={thTdStyle}>Salary</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td style={thTdStyle}>{employee.id}</td>
                        <td style={thTdStyle}>{employee.employeeName}</td>
                        <td style={thTdStyle}>{employee.jobTitle}</td>
                        <td style={thTdStyle}>{employee.salary}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 style={h2Style}>Job Summary</h2>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thTdStyle}>Job Title</th>
                    <th style={thTdStyle}>Average Salary</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(jobSummary).map(([title, salary]) => (
                    <tr key={title}>
                        <td style={thTdStyle}>{title}</td>
                        <td style={thTdStyle}>{salary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
