import React, { useState } from 'react';

const FileUpload = ({ onFileChange, onProcessClick, showTables }) => {
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (e) => {
    setFileSelected(!!e.target.files.length);
    onFileChange(e);
  };

  return (
    <div className="mt-8">
      <label className="block mb-2 text-gray-700">Choose a CSV file:</label>
      <div className="flex items-center">
        <input
          type="file"
          className="border rounded py-2 px-3 mr-2"
          onChange={handleFileChange}
        />
        {fileSelected && !showTables && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={onProcessClick}
          >
            Process file
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
