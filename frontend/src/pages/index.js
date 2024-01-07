import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import UploadButton from "@/components/UploadButton";
import ProcessButton from "@/components/ProcessButton";
import EmployeeTable from "@/components/EmployeeTable";
import JobSummaryTable from "@/components/JobSummaryTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState({});
  const [showProcessButton, setShowProcessButton] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    setShowProcessButton(true);
    setShowTables(false);
  };

  const handleProcess = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const fileName = file.name;
      const employeesResponse = await fetch(
          `http://localhost:8084/api/employees/All/${fileName}`
      );
      const jobSummaryResponse = await fetch(
          `http://localhost:8084/api/employees/average-salary-by-job-title/${fileName}`
      );

      const data2 = await jobSummaryResponse.json();
      setJobSummary(data2);

      const data = await employeesResponse.json();
      setEmployees(data);
    } catch (error) {
      setShowTables(false);
      alert("File invailable");
    } finally {
      setLoading(false);
    }
    setShowTables(true);
    setShowProcessButton(false);
  };

  return (
      <main
          className={`flex min-h-screen flex-col items-center space-y-3 p-24 w-full ${inter.className}`}
      >
        <h1>DNA Engineering Full-Stack Internship Home Assignment</h1>
        <div className="flex items-center flex-col justify-start space-x-4 h-full ">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <UploadButton onFileSelect={handleFileSelect} />
            {file && showProcessButton && (
                <ProcessButton onProcess={handleProcess} />
            )}
          </div>

          {showTables && (
              <>
                <EmployeeTable employees={employees} />
                <JobSummaryTable summary={jobSummary} />
              </>
          )}
        </div>
      </main>
  );
}
