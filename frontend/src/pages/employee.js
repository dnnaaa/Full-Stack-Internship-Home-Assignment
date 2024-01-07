import {useEffect, useState} from "react";
import Pagination from "./pagination";


/**
 * Employee component
 *
 * @returns {JSX.Element} The rendered Employee component
 */
const Employee = () => {
    // State variables
    const [employees, setEmployees] = useState([]); // Holds the list of employees
    const [page, setPage] = useState(1); // Holds the current page number
    const [totalPages, setTotalPages] = useState(0); // Holds the total number of pages

    const pageSize = 5; // Number of employees to display per page

    useEffect(() => {
        // Fetch employees from the API when the page number changes
        fetch(`http://localhost:8080/employees?page=${page}&size=${pageSize}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                if (json.status !== "SUCCESS") {
                    throw new Error(json.message);
                }
                setEmployees(json.data.employees);
                setTotalPages(json.data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <div className="flex flex-col items-center justify-evenly">
            <h1 className="text-3xl font-semibold my-5">Employees</h1>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Salary</th>
                </tr>
                </thead>
                <tbody>
                {employees?.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.jobTitle}</td>
                        <td>{employee.salary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
        </div>
    );
};
export default Employee;