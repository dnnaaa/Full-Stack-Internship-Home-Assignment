import React from 'react';
import FileUpload from '@/components/FileUpload';
import Tables from '@/components/Tables';
import useCSVParser from '@/hooks/useCSVParser';

const Home = () => {
  const {
    file,
    employees,
    jobSummary,
    showTables,
    handleFileChange,
    handleProcessClick,
  } = useCSVParser();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-500">CSV Parser</h1>
      <FileUpload onFileChange={handleFileChange} onProcessClick={handleProcessClick} showTables={showTables} />
      {showTables && <Tables employees={employees} jobSummary={jobSummary} />}
    </div>
  );
};

export default Home;
