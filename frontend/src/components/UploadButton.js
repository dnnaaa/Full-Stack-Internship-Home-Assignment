import React from 'react';
const UploadButton = ({ onChange }) => {
  return (
    <div className="upload-container">
      <input
        type="file"
        accept=".csv"
        onChange={onChange}
        className="hidden-input"
        id="file-input"
      />
      <label htmlFor="file-input" className="upload-button">
        Upload
      </label>
    </div>
  );
};

export default UploadButton;