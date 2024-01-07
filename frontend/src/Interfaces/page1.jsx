import React, { useState } from "react";

const UploadFile = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => setFile(e.target.files[0]);

  const uploadFile = () => {
    if (file) {
      onFileUpload(file);
    } else {
      alert("Please select a file");
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-btn select-file-btn">
        Select File
        <input type="file" onChange={handleFileSelect} hidden />
      </label>
      {file && (
        <button className="upload-btn upload-file-btn" onClick={uploadFile}>
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadFile;