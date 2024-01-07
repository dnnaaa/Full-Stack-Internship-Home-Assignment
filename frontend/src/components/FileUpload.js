// components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };
const UploadHandle=()=>{
    const input=document.getElementById("fileInput")
    input.click();
}
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <input
                type="file"
                id="fileInput"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden border rounded p-2"
            />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={UploadHandle}> Upload</button>
        </div>
    );
};

export default FileUpload;
