import React, { useState } from "react";

export default function EmployeeInformation({ TABLE_ROWS }) {
  const TABLE_HEAD = ["Id", "Employee Name", "Job Title", "Salary"];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(TABLE_ROWS.length / 10);
  return (
    <div className="flex justify-evenly rounded-xl mb-4">
      <table className="  text-sm text-left  text-gray-500 shadow-md rounded-xl shadow-orange-200">
        <thead className="text-xs text-gray-700 uppercase rounded-xl ">
          <tr>
            {TABLE_HEAD.map((head, index) => {
              const className = `py-3 px-5  ${
                index % 2 === 0
                  ? "px-4 py-3 bg-gray-50"
                  : "px-6 py-3 bg-gray-100"
              }`;

              return (
                <th key={head} className={className}>
                  <p className=" font-bold uppercase text-blue-gray-400">
                    {head}
                  </p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.length > 0 &&
            TABLE_ROWS.slice((currentPage - 1) * 10, currentPage * 10).map(
              (employee, index) => {
                return (
                  <tr key={employee.id} className={` border-b`}>
                    <td className={` px-4 py-4 w-11`}>
                      <p className="font-medium">{employee.id}</p>
                    </td>
                    <td
                      className={`px-6 py-4  text-gray-900 whitespace-nowrap bg-gray-50`}
                    >
                      <p className="text-xs font-semibold text-blue-gray-600">
                        {employee.employee_name}
                      </p>
                    </td>
                    <td className="">
                      <p className="px-6 py-4 text-xs items-top ml-2 font-semibold text-blue-gray-600">
                        {employee.job_title}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <p className=" font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                        {employee.salary} DH
                      </p>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
        {TABLE_ROWS && (
          <tfoot className="flex flex-row border-t border-blue-gray-50 p-4">
          
            <p  className=" text-left font-normal w-fit mr-4">
              Page {currentPage} of {totalPage}
            </p>
              <button
                type="reset"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-200 dark:text-gray-400 "
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={currentPage === totalPage || totalPage === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-[#FF7900] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-10  dark:focus:ring-gray-700 dark:bg-[#FF7900] dark:text-white "
              >
                Next
              </button>

          </tfoot>
        )}
      </table>
    </div>
  );
}
