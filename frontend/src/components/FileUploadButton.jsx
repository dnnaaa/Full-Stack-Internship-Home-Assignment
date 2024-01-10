import React, { useState } from "react";

const FileUploadButton = ({ onFileUpload }) => {
  const labelStyle = {
    display: 'inline-block',
    background: '#c0392b',
    textAlign: 'center',
    padding: '7px 18px',
    fontSize: '18px',
    letterSpacing: '1.5px',
    userSelect: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '30px',
  };

  const inputStyle = {
    display: 'none',
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div className="flex flex-col items-center pt-6">
      <input style={inputStyle} id="load-excel" type="file" onChange={handleFileUpload} />
      <label style={labelStyle} htmlFor="load-excel">Upload</label>
    </div>
  );
};

export default FileUploadButton;
