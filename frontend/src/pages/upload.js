import React, { useState } from 'react';
import axios from 'axios';
import DisplayEmployees from './displayemployees';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [displayEmployees, setDisplayEmployees] = useState(false); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('csv-file', selectedFile);

    try {
      await axios.post('http://localhost:9092/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUploaded(true); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDisplayEmployees = () => {
    setDisplayEmployees(true); 
  };

  return (
<div className="flex flex-col items-start space-y-4">
  <div className="flex flex-row items-start space-x-4">
    <input
      type="file"
      onChange={handleFileChange}
      className="border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
    <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Upload
    </button>
    {fileUploaded && (
      <button onClick={handleDisplayEmployees} className="bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Process 
      </button>
    )}
  </div>
  {displayEmployees && (
    <div>
      <DisplayEmployees />
    </div>
  )}
</div>


  );
};

export default Upload;
