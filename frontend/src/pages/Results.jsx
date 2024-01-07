// pages/process.js
import React, { useEffect, useState } from 'react';
import EmployeeTable from "../components/EmployeeTable";
import JobSummaryTable from "../components/JobSummaryTable";
import FileUpload from '../components/FileUpload';

const ProcessPage = () => {
    const [employees, setEmployees] = useState([]);
    const [jobSummary, setJobSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/hello');
                const fetchedData = await response.json();

                // Set employee data
                setEmployees(fetchedData.employees);
                setJobSummary(fetchedData.jobSummary);
                // Fetch job summary data


                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <FileUpload />
            {isLoading ? (
                <p>Loading employee information...</p>
            ) : error ? (
                <p>Error fetching data: {error.message}</p>
            ) : (
                <>
                    <EmployeeTable employees={employees} />
                    <JobSummaryTable jobSummary={jobSummary} />
                </>
            )}
        </>
    );
};

export default ProcessPage;
