import React, { useState } from "react";

const FileUploadComponent = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    } else {
      alert("Please select a file");
    }
  };

  return (
    <div className="container mt-9 text-center ">
      <span className="btn btn-info btn-file me-2">
        Upload <input type="file" onChange={handleFileChange} />
      </span>
      {selectedFile && (
        <button className="btn btn-warning" onClick={handleUpload}>
          Process
        </button>
      )}
    </div>
  );
};

export default FileUploadComponent;
