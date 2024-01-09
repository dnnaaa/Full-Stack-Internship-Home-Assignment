import { useState } from "react";

export default function EmployeeTable({ employees }) {
    const [currentPage, setCurrentPage] = useState(1); // statge to store the current page
    const employeesPerPage = 10; // how many employyes should be per page

    const Last_Visible_Employee_Index = currentPage * employeesPerPage; // index of last employees on the current page
    const First_Visisble_Employee_Index = Last_Visible_Employee_Index - employeesPerPage; // index of first employees on the current page
    const Visisble_Employees = employees.slice(First_Visisble_Employee_Index, Last_Visible_Employee_Index); // list of the employees of the current page
    const Total_Of_Pages = Math.ceil(employees.length / employeesPerPage) // variable contain the total of pages that exist
    const PagesNumber = Array.from({ length: Total_Of_Pages }, (_, i) => i + 1) // array contain pages number [1,2,3,4,.....,Total_Of_Pages]

    return (
        <div className="table-container">
            <h2 className="h2">Employee Information</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Visisble_Employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.salary}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                employees.length > 10 && (
                    <div className="navigator">
                        {
                            currentPage > 1 && <button className="prev" onClick={paginate(currentPage - 1)}>prev</button>
                        }
                        <div className="pages_container">
                            {
                                PagesNumber.map(pageNumber => (
                                    <button key={pageNumber} onClick={paginate(pageNumber)} className={currentPage == pageNumber ? "active" : ""}>
                                        {pageNumber}
                                    </button>
                                ))
                            }
                        </div>
                        {
                            currentPage < Total_Of_Pages && <button className="next" onClick={paginate(currentPage + 1)}>next</button>
                        }
                    </div>
                )
            }
        </div>
    );


    function paginate(pageNumber) {
        return () => setCurrentPage(pageNumber);
    }
}
