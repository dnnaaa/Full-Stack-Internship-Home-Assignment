import React from "react";
import EmployeeTable from "../components/EmployeeTable";
import ErrorComponent from "../components/ErrorComponent";
import { useState, useEffect } from "react";
import JobSummaryTable from "@/components/JobSummaryTable";

import { fetchEmployee } from "@/service/fetchEmployees";
import { fetchJobSummary } from "@/service/ferchJobSummary";
const ResultsPage = () => {
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployee(setEmployees, setError);
  }, []);

  useEffect(() => {
    fetchJobSummary(setJobSummary, setError);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-green-400 text-3xl">Results</h1>
      {error && <ErrorComponent message={error} />}
      <EmployeeTable employees={employees} />
      <h2 className="text-green-400 text-3xl mt-5 mb-5">Jobs Summary</h2>
      <JobSummaryTable jobSummary={jobSummary} />
    </div>
  );
};

export default ResultsPage;
