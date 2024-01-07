import { Inter } from 'next/font/google'
import { useState,useEffect  } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })


const PAGE_SIZE = 10; // Set the number of items per page

const Home = () => {
  const [file, setFile] = useState(null);
  const [processButtonVisible, setProcessButtonVisible] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobsSummary, setJobsSummary] = useState({});
  const [showJobsSummary, setShowJobsSummary] = useState(false);



  useEffect(() => {
    // Calculate the total number of pages based on the PAGE_SIZE
    setTotalPages(Math.ceil(processedData.length / PAGE_SIZE));
  }, [processedData]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setProcessButtonVisible(true);
  };

  const handleProcessClick = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send file to backend for processing and save to database
      await axios.post('http://localhost:8080/api/csv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch processed data from the backend
      const response = await axios.get('http://localhost:8080/api/csv/employees');
      const processedData = response.data;

      setProcessedData(processedData);
      setCurrentPage(1); // Reset to the first page

       // Fetch jobs summary
       const jobsSummaryResponse = await axios.get('http://localhost:8080/api/csv/jobsSummary');

       setJobsSummary(jobsSummaryResponse.data);
       setShowJobsSummary(true);

      alert('File processed successfully!');
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = processedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold mb-4">CSV Processor Interface</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />
      {processButtonVisible && (
        <button
          onClick={handleProcessClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Process
        </button>
      )}

      {processedData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Employee Information</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Employee Name</th>
                <th className="border px-4 py-2">Job Title</th>
                <th className="border px-4 py-2">Salary</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((employee) => (
                <tr key={employee.id}>
                  <td className="border px-4 py-2">{employee.id}</td>
                  <td className="border px-4 py-2">{employee.employee_name}</td>
                  <td className="border px-4 py-2">{employee.job_title}</td>
                  <td className="border px-4 py-2">{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

{showJobsSummary && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Jobs Summary</h2>
          <table className="border-collapse border w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Job Title</th>
                <th className="border p-2">Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(jobsSummary).map(([jobTitle, averageSalary]) => (
                <tr key={jobTitle} className="border">
                  <td className="border p-2">{jobTitle}</td>
                  <td className="border p-2">{averageSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}





    </main>
  );
};

export default Home;