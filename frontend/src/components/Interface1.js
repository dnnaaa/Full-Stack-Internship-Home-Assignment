import React from 'react';
import { useFileContext } from '../context/FileContext';
import Interface2 from './Interface2';

const Interface1 = () => {
  const { uploadFile } = useFileContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };


  return (
    <main>
    <div className="flex items-center justify-center">
      <label htmlFor="fileInput" className="btn-primary py-2 px-4 cursor-pointer mr-4 rounded-lg">
        Upload
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>     
    </div>
    <Interface2  />    
    </main>
  );
};

export default Interface1;
