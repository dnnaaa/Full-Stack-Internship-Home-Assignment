import PaginatedTable from '@/components/TablePageination';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
// import PaginatedTable from '@components/TablePagination'
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [jobs, setJobs] = useState(null);
  const columnsEmployees = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'name', accessor: 'name' },
    { Header: 'jobTitle', accessor: 'jobTitle' },
    { Header: 'Salary', accessor: 'salary' },
  ];

  const columnsJobs = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Average Salary', accessor: 'averageSalary' },
  ];
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleProcessing = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        const result = await response.json();
        setEmployees(result.employees);
        setJobs(result.jobs);
        setSelectedFile(null)
      } else {
        console.error('Failed to upload file');
        // Gérer les cas d'erreur
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      // Gérer les cas d'erreur
    }
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} style={{ background: '#F7F7F7' }}>
      <div className="flex mb-4">
        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
          Upload
        </label>
        {selectedFile && (
             <button onClick={handleProcessing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4">
          Processing
        </button>
        )}
     
      </div>

      {employees && (
        <>
        <PaginatedTable  columns={columnsEmployees} data={employees} />
        <PaginatedTable  columns={columnsJobs} data={jobs} />
                 
        </>
      )}

      
    </main>
  );
}
