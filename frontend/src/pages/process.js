import { Inter } from "next/font/google";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFile } from "../FileProvider";

const inter = Inter({ subsets: ["latin"] });

//here we process the csv by post request to our spring boot rest api
//then we populate our tables (employees && jobs titles with their average salaries)
export default function Process() {
  let [employees, setEmployees] = useState([]);
  let [jobSummary, setJobSummary] = useState({});
  let [pagination, setPagination] = useState(1);
  let { selectedFile } = useFile();
  let jobSummaryEntries = Object.entries(jobSummary);

  const fetchData = async () => {
    let formData = new FormData();
    formData.append("file", selectedFile);

    try {
      let response = await axios.post(
        "http://localhost:8080/api/resources/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEmployees(response.data.employeeList);
      setJobSummary(response.data.jobSummary);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let handlePagination = function (currentPage) {
    setPagination(currentPage);
  };

  return (
    <main
      className={`bg-blue-700 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-center mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Employees Data from {selectedFile.name}
        </h5>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
          <table className="w-full mb-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {employees
                .slice((pagination - 1) * 10, pagination * 10)
                .map((employee) => (
                  <tr
                    key={employee.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {employee.id}
                    </th>
                    <td className="px-6 py-4">{employee.employee_name}</td>
                    <td className="px-6 py-4">{employee.job_title}</td>
                    <td className="px-6 py-4">{employee.salary}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav
            aria-label="Page navigation example"
            className="flex items-center justify-center mb-5"
          >
            <ul className="inline-flex text-sm">
              {pagination === 1 ? (
                <li
                  className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg disabled opacity-50"
                  disabled
                >
                  Previous
                </li>
              ) : (
                <li
                  onClick={() => handlePagination(pagination - 1)}
                  className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </li>
              )}
              <li
                onClick={() => handlePagination(pagination)}
                className="cursor-pointer flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                {pagination}
              </li>
              {pagination + 1 <= employees.length / 10 && (
                <li
                  onClick={() => handlePagination(pagination + 1)}
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {pagination + 1}
                </li>
              )}
              {pagination + 2 <= employees.length / 10 && (
                <li
                  onClick={() => handlePagination(pagination + 2)}
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {pagination + 2}
                </li>
              )}
              {pagination < employees.length / 10 - 2 ? (
                <li
                  onClick={() => handlePagination(pagination + 1)}
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </li>
              ) : (
                <li
                  className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg disabled opacity-50"
                  disabled
                >
                  Next
                </li>
              )}
            </ul>
          </nav>
        </div>

        <h5 className="text-center mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Jobs Data from {selectedFile.name}
        </h5>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Average Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {jobSummaryEntries.map(([jobTitle, averageSalary]) => (
                <tr
                  key={jobTitle}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {jobTitle}
                  </th>
                  <td className="px-6 py-4">
                    {Number(averageSalary.toFixed(2))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
