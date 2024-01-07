// components/FileUpload.js
import { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && <button onClick={handleUpload}>Process</button>}
        </div>
    );
};

export default FileUpload;
