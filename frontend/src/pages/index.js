// pages/index.js
import React, { useState } from 'react';
import FileUpload from '../../../../../githubprojrect/Full-Stack-Internship-Home-Assignment/frontend/src/components/FileUpload';
import ProcessButton from "../../../../../githubprojrect/Full-Stack-Internship-Home-Assignment/frontend/src/components/ProcessButton";


const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {

    if (file && file.type === 'text/csv') {
      setSelectedFile(file);

    } else {
      // Handle case where the selected file is not a CSV
      alert('Please choose a CSV file.');
    }
  };


  const handleUploadClick=()=>{
    console.log(selectedFile)


  }
  return (
      <div className="container flex flex-col justify-center items-center bg-amber-50 w-full h-screen gap-8">
        <FileUpload onFileSelect={handleFileSelect} />
        <div className="w-96 flex flex-col justify-center items-center ">
          {selectedFile && <ProcessButton  onProcessClick={handleUploadClick} />}
        </div>
      </div>
  );
};

export default HomePage;
