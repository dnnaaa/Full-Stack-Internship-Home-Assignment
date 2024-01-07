import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import Tables from './tables';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [processedData, setProcessedData] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/api/csv/upload', formData)
            .then(response => {
                if (typeof onUpload === 'function') {
                    onUpload(response.data);
                } else {
                    console.error('onUpload is not a function');
                    console.error(response.data);
                }
                setProcessedData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="main-container">
            <div className={`file-upload-container ${processedData ? 'hidden' : ''}`}>
                <h1>CSV File Upload</h1>
                <div className="file-input-container">
                    {file && <p className="file-name">{file.name}</p>}
                    <label htmlFor="file" className="choose-file-btn">
                        Choose File
                    </label>
                    <input
                        type="file"
                        id="file"
                        className="file-input"
                        onChange={handleFileChange}
                        accept=".csv"
                    />
                    {file && (
                        <button
                            onClick={handleUpload}
                            className="process-btn"
                            disabled={file ? false : true}
                        >
                            Process
                        </button>
                    )}
                </div>
            </div>

            <div className={`tables-container ${processedData ? '' : 'hidden'}`}>
                {processedData && (
                    <Tables
                        employees={processedData.employees}
                        averageSalaries={processedData.averageSalaries}
                    />
                )}
            </div>
        </div>
    );
};

export default FileUpload;
