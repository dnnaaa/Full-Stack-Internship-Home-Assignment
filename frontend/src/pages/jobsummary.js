import {useEffect, useState} from "react";
import Pagination from "./pagination";

/**
 * Component that displays job summaries.
 * Fetches job summaries from the API and renders them in a table.
 * Provides pagination functionality.
 */
const JobSummary = () => {

    // State variables
    const [jobSummaries, setJobSummaries] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;

    /**
     * Fetches job summaries from the API when the page state variable changes.
     * Updates the jobSummaries and totalPages state variables with the fetched data.
     * Handles errors that occur during the fetch.
     */
    useEffect(() => {
        fetch(`http://localhost:8080/employees/jobsummaries?page=${page}&size=${pageSize}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json();
            })
            .then(json => {
                if (json.status !== "SUCCESS"){
                    throw new Error(json.message);
                }
                setJobSummaries(json.data.jobSummaries);
                setTotalPages(json.data.totalPages);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, [page]);

    /**
     * Renders the JobSummary component.
     * Displays the job summaries in a table.
     * Displays pagination component.
     */
    return (
        <div className="flex flex-col items-center justify-evenly my-14">
            <h1 className="text-3xl font-semibold my-5">Job Summary</h1>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Job Title</th>
                    <th>Average Salary</th>
                </tr>
                </thead>
                <tbody>
                {jobSummaries?.map((jobSummary) => (
                    <tr key={jobSummary.id}>
                        <td>{jobSummary.id}</td>
                        <td>{jobSummary.title}</td>
                        <td>{jobSummary.averageSalary}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}/>
        </div>
    );
}

export default JobSummary;