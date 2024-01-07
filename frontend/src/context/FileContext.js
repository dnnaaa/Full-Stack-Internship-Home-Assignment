// context/FileContext.js
import { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingResults, setProcessingResults] = useState(null); // Updated to null

  const uploadFile = (file) => {
    setSelectedFile(file);
  };

  const setResults = (results) => {
    setProcessingResults(results);
  };

  return (
    <FileContext.Provider value={{ selectedFile, uploadFile, processingResults, setResults }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
