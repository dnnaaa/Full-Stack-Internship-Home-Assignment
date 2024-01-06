import { useState, useEffect, useRef } from 'react';
import DisplayResults from "@/pages/DisplayResults";
import api from "@/pages/api";

export default function ProcessUploadButton() {
    const [uploadedEmployees, setUploadedEmployees] = useState([]);
    const [processingResults, setProcessingResults] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    const fileInputRef = useRef(null); // Reference to the file input element

    const handleFileChange = async () => {
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);

        try {
            const response = await api.post('/upload', formData);
            const uploadedEmployees = response.data;
            setUploadedEmployees(uploadedEmployees); // Save uploaded employees in state
            setFileUploaded(true); // Set fileUploaded to true once a file is uploaded
        } catch (error) {
            alert('Error uploading file: ' + error.message);
        }
    };

    const handleProcess = async () => {
        try {
            const response = await api.post('/process', uploadedEmployees);
            setProcessingResults(response.data);
            setFileUploaded(false);
            fileInputRef.current.value = ''; // Reset the file input
        } catch (error) {
            alert('Error processing file: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Process and Upload Buttons</h2>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
                <button
                    style={{ margin: '10px', padding: '8px 16px' }}
                    onClick={() => fileInputRef.current.click()}
                >
                    Upload
                </button>
            {fileUploaded && (
                <button
                    style={{ margin: '10px', padding: '8px 16px' }}
                    onClick={handleProcess}
                >
                    Process
                </button>
            )}

            <div>
                {processingResults && <DisplayResults processingResults={processingResults} />}
            </div>
        </div>
    );
}
