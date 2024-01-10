import React from "react";
import EmployesTable from "../components/EmployesTable";
import ErrorComponent from "../components/ErrorComponent";
import { useState, useEffect } from "react";
import Employee from "../Employee";
import axios from "axios";
import JobSummaryTable from "@/components/JobSummaryTable";
const ResultsPage = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  // Display the CSV file data as a Table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/csv/employees"
        );
        setEmployees(
          response.data.map((employeeData) => {
            // Assuming Employee class has properties matching the API response
            return new Employee(
              employeeData.id,
              employeeData.name,
              employeeData.jobTitle,
              employeeData.salary
            );
          })
        );
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Error fetching employee data. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Calculate job summary with average salary
  const calculateJobSummary = () => {
    const jobSummary = {};

    employees.forEach((employee) => {
      if (jobSummary[employee.jobTitle]) {
        jobSummary[employee.jobTitle].totalSalary += employee.salary;
        jobSummary[employee.jobTitle].count += 1;
      } else {
        jobSummary[employee.jobTitle] = {
          totalSalary: employee.salary,
          count: 1,
        };
      }
    });
    // Calculate average salary
    for (const jobTitle in jobSummary) {
      jobSummary[jobTitle].averageSalary =
        jobSummary[jobTitle].totalSalary / jobSummary[jobTitle].count;
    }

    return jobSummary;
  };

  const jobSummary = calculateJobSummary();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="bg-gray-300 shadow-xl mb-3 text-white p-2 rounded-md text-3xl">Results</h1>
      {error && <ErrorComponent message={error} />}
      <EmployesTable employees={employees} />
      <h2 className="bg-gray-300 shadow-xl mb-3 text-white p-2 rounded-md text-3xl mt-5 mb-5">Jobs Summary</h2>
      <JobSummaryTable jobSummary={jobSummary} />
    </div>
  );
};

export default ResultsPage;