import { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const setFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <FileContext.Provider value={{ selectedFile, setFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  return useContext(FileContext);
};