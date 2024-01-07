import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (file) {
            onFileUpload(file);
            setFile(null);
        }
    };

    return (
        <div className="mt-1 d-flex flex-column align-items-center">
            <div className="mt-4 d-flex flex-column align-items-center">
                <label htmlFor="fileUpload" className="form-label">Choose your CSV file:</label>
                <input type="file" className="form-control" id="fileUpload" onChange={handleFileChange} />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleFileUpload}>Upload and Process</button>
        </div>


    );
};

export default FileUpload;
