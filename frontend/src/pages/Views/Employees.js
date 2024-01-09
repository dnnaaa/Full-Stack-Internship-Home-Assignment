import { useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import JobSummaryTable from "../Components/JobSummaryTable";
import UploadComponent from "../Components/UploadComponent";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [jobSummary, setJobSummary] = useState({});

    return (
        <div>
            <UploadComponent setEmployees={setEmployees} setJobSummary={setJobSummary} />
            {
                employees.length > 0 && <>
                    <EmployeeTable employees={employees} />
                    <JobSummaryTable jobSummary={jobSummary} />
                </>
            }
            <div data-error-container></div> { /* div that will contain error if the user select a non csv file */ }
        </div>
    )
}
