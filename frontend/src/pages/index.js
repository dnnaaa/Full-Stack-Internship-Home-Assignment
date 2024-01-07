import React, { useRef } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const handleFileUpload = async () => {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:8080/api/v1/employees/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
         
            router.push('/results');
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  const changeVisibility = () => {
    const submitButton = document.getElementById('submitFileButton');
    submitButton.style.visibility = 'visible';

  };

  return (
    <div>
      <h1>Upload Page</h1>
      <input type="file"  onChange={changeVisibility} ref={fileInputRef} />
      <button id='submitFileButton' onClick={handleFileUpload}>Click me</button>
    </div>
  );
};


