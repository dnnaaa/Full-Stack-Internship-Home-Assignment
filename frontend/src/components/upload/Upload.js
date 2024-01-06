import React, { useRef, useState } from "react";
import TableComponent from "../table/TableComponent ";
import axios from "axios";
import instance from "@/pages/api/instance";

const empColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "employeeName", headerName: "First name", width: 130 },
  { field: "jobTitle", headerName: "Job Title", width: 170 },
  { field: "salary", headerName: "Salary", type: "number", width: 130 },
];
const SammryColumns = [
  { field: "jobTitle", headerName: "Job Title", width: 200 },
  { field: "averageSalary", headerName: "Average Salary", width: 200 },
];

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [empRows, setEmpRows] = useState([]);
  const [sammryRows, setSammryRows] = useState([]);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      console.log(file.name);
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      console.log("Please select a CSV file.");
    }
  };
  const handleProcess = async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await instance.post("/employees/processCSV", formData);
        setEmpRows(response.data.employeeDtos);
        setSammryRows(response.data.jobSummaryDtos);
        setSelectedFile(null)
        fileInputRef.current.value = "";
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
  };
  return (
    <div className="mx-8">
      <div className="flex space-x-16 my-4 items-center justify-center">
        <div className="flex  items-center justify-center bg-grey-lighter">
          <label className="w-40 h-16 flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Upload</span>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {selectedFile && (
          <button
            onClick={handleProcess}
            type="button"
            className="w-40 h-16 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Process
          </button>
        )}
      </div>
      {empRows.length>0 && sammryRows.length>0 && (
        <div className="flex space-x-16  items-center justify-center">
          <TableComponent
            title={"Employees List"}
            columns={empColumns}
            rows={empRows}
          />
          <TableComponent
            title={"Job Sammry"}
            columns={SammryColumns}
            rows={sammryRows}
          />
        </div>
      )}
    </div>
  );
}

export default Upload;
