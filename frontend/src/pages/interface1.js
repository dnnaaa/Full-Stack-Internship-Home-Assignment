import React, { useState } from 'react';

const Interface1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8080/employees/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const message = await response.text();
        console.log("File uploaded successfully:", message);
        // Handle successful upload (e.g., navigate to Interface2)
      } else {
        console.error("Upload failed:", response.statusText);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error("Upload error:", error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>File selected: {selectedFile.name}</p>}
      {selectedFile && <button onClick={handleFileUpload}>Process</button>}
    </div>
  );
};

export default Interface1;
