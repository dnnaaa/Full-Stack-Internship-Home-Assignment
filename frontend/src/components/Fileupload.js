import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

const FileUpload = () => {
  const [showProcessButton, setShowProcessButton] = useState(false);

  const handleUpload = async () => {
    try {
      await axios.post('http://localhost:8080/files/csvformat');

      // If the request is successful, show the "Process" button
      setShowProcessButton(true);
    } catch (error) {
      // Handle error, show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error Uploading File',
        text: error.message,
      });
      console.error('Error uploading file:', error.message);
    }
  };

  const handleProcess = async () => {
    try {
      const response = await axios.post('http://localhost:8080/files/upload');

      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'File Processed',
        text: response.data.message, // Display the response message
      });
      setTimeout(() => {
        window.location.href = '/interface3';
      }, 3000);
      // Add logic to show or process the response message as needed
    } catch (error) {
      // Handle error, show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error Processing File',
        text: error.message,
      });
      console.error('Error processing file:', error.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Interface 1</h2>
      <Button variant="primary" style={{ marginBottom: '20px' }} onClick={handleUpload}>
        Upload
      </Button>

      {showProcessButton && (
        <Button variant="success" onClick={handleProcess}>
          Process
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
