import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProcessButton from "../components/ProcessButton";

const HomePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    return (
        <div>
            <FileUpload onFileSelect={handleFileSelect} />
        </div>
    );
};

export default HomePage;