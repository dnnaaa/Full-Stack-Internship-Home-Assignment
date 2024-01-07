import React from 'react';
import { useRef } from 'react';

const FileUpload = ({ onFileChange }) => {

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = fileInputRef.current.files[0];
    onFileChange(file);
  };

  return (
    <div >
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        <button
            className='btn btn-primary px-3 m-3 text-center'
            onClick={() => fileInputRef.current.click()}
        >
            Upload
        </button>
    </div>
  );
};

export default FileUpload;