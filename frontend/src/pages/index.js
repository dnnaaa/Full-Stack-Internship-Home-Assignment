import PaginatedTable from '@/components/PaginationTable';
import { Inter } from 'next/font/google'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [jobs, setJobs] = useState([]);

  const columnsEmpoloyees = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Salary', accessor: 'salary' },
  ];


  const columnsJobs = [
    { Header: 'JobTitle', accessor: 'title' },
    { Header: 'Average Salary', accessor: 'averageSalary' },
  ];




  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

  };


  const handleProssecClick = async () => {
    // Handle the selected file


    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          console.log('File uploaded successfully');

          setEmployees(data.employees);
          setJobs(data.jobs);
          setSelectedFile(null)
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected');
    }
  };


  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="flex mb-4">


        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
          Upload
        </label>

        {selectedFile && (

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleProssecClick}
          >
            Processing
          </button>

        )}

      </div>
      {employees.length > 0 && (
        <>
          <PaginatedTable columns={columnsEmpoloyees} data={employees} />
          <PaginatedTable columns={columnsJobs} data={jobs} />
        </>
      )}
    </main>
  )
}