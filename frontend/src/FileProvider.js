import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
        {children}
        </FileContext.Provider>
    );
};

export const useFile = () => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFile must be used within a FileProvider");
    }
    return context;
};
