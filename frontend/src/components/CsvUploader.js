import { useState } from 'react';

const CsvUploader = () => {
    const [file, setFile] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
    const [averageSalaryCurrentPage, setAverageSalaryCurrentPage] = useState(1);
    const pageSize = 5; // Adjust the number of items per page as needed

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleProcess = async (event) => {
        event.preventDefault();

        try {
            setUploadError(null);
            setIsLoading(true);

            if (!file) {
                setUploadError('Please select a CSV file.');
                return;
            }

            // Check if the selected file is a CSV file
            const isCSVFile = file.name.toLowerCase().endsWith('.csv');

            if (isCSVFile) {
                setFile(file);
                setUploadError(null);
            } else {
                setFile(null);
                setUploadError('Please select a valid CSV file.');
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8080/api/csv/process', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
                setEmployeeCurrentPage(1); // Reset to the first page after uploading
            } else {
                const errorMessage = await response.text();
                setUploadError(`Failed to upload CSV file. ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setUploadError('An unexpected error occurred during the upload.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateAverageSalaryByJobTitle = () => {
        const averageSalaries = {};
        const jobTitleCounts = {};

        employees.forEach((employee) => {
            const jobTitle = employee.jobTitle;

            if (!averageSalaries[jobTitle]) {
                averageSalaries[jobTitle] = 0;
                jobTitleCounts[jobTitle] = 0;
            }

            averageSalaries[jobTitle] += employee.salary;
            jobTitleCounts[jobTitle]++;
        });

        const result = {};

        for (const jobTitle in averageSalaries) {
            result[jobTitle] = averageSalaries[jobTitle] / jobTitleCounts[jobTitle];
        }

        return result;
    };

    const averageSalaries = calculateAverageSalaryByJobTitle();

    const totalEmployeePages = Math.ceil(employees.length / pageSize);
    const totalAverageSalaryPages = Math.ceil(Object.keys(averageSalaries).length / pageSize);

    const visibleEmployees = employees.slice((employeeCurrentPage - 1) * pageSize, employeeCurrentPage * pageSize);
    const visibleAverageSalaries = Object.keys(averageSalaries)
        .slice((averageSalaryCurrentPage - 1) * pageSize, averageSalaryCurrentPage * pageSize)
        .map((jobTitle) => ({
            jobTitle,
            averageSalary: averageSalaries[jobTitle],
        }));

    const handlePageChange = (newPage, type) => {
        if (newPage >= 1) {
            if (type === 'employee') {
                setEmployeeCurrentPage(newPage);
            } else if (type === 'averageSalary') {
                setAverageSalaryCurrentPage(newPage);
            }
        }
    };

    return (
        <div className="container mx-auto mt-8 p-8 bg-gray-100 border border-gray-300 rounded-md">
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleProcess}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                disabled={isLoading}
            >
                {isLoading ? 'Uploading...' : 'Process CSV'}
            </button>

            {uploadError && (
                <p className="text-red-500 mt-4 mb-0 text-sm">{uploadError}</p>
            )}

            {employees.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Employee Data</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Employee Name</th>
                            <th className="py-2 px-4 border">Job Title</th>
                            <th className="py-2 px-4 border">Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visibleEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="py-2 px-4 border">{employee.id}</td>
                                <td className="py-2 px-4 border">{employee.employeeName}</td>
                                <td className="py-2 px-4 border">{employee.jobTitle}</td>
                                <td className="py-2 px-4 border">{employee.salary}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(employeeCurrentPage - 1, 'employee')}
                            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md mr-2"
                            disabled={employeeCurrentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(employeeCurrentPage + 1, 'employee')}
                            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md"
                            disabled={employeeCurrentPage === totalEmployeePages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {Object.keys(averageSalaries).length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Average Salary by Job Title</h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">Job Title</th>
                            <th className="py-2 px-4 border">Average Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visibleAverageSalaries.map(({ jobTitle, averageSalary }) => (
                            <tr key={jobTitle}>
                                <td className="py-2 px-4 border">{jobTitle}</td>
                                <td className="py-2 px-4 border">{averageSalary}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(averageSalaryCurrentPage - 1, 'averageSalary')}
                            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md mr-2"
                            disabled={averageSalaryCurrentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(averageSalaryCurrentPage + 1, 'averageSalary')}
                            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md"
                            disabled={averageSalaryCurrentPage === totalAverageSalaryPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CsvUploader;
