import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data)
      onFileUpload(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
};

export default FileUploader;