import styles from '../styles/EmployeeTable.module.css';
const EmployeeTable = ({ employees }) => {
    return (
        <table className={styles.employeeTable}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Salary</th>
            </tr>
            </thead>
            <tbody>
            {employees && employees.map((employee) => (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.job_title}</td>
                    <td>{employee.salary}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
