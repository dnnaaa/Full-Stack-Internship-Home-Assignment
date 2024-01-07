import React, { useState } from 'react';

const Upload = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileSelected(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <button onClick={() => console.log("Process file")}>Process</button>}
    </div>
  );
};

export default Upload;
