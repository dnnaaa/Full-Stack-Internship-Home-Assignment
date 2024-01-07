import React, { useState } from 'react';

const UploadButton = ({ onFileChange }) => {
  const handleFileChange = (e) => onFileChange(e.target.files[0]);

  const handleButtonClick = () => document.getElementById('file-input').click();

  return (
    <div className="flex items-center justify-center min-h-64 bg-gray-100">
      <div className="p-8 border-2 border-blue-500 rounded-md bg-white shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Upload CSV File</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 border rounded shadow-md"
          onClick={handleButtonClick}
        >
          Choose File
        </button>
        <input type="file" id="file-input" className="hidden" accept=".csv" onChange={handleFileChange} required />
      </div>
    </div>
  );
};

export default UploadButton;
