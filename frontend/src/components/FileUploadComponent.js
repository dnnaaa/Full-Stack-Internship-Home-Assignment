import { useState } from 'react';

const FileUploadComponent = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const file = new FormData();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () =>{
        if (selectedFile) {
            file.append('file', selectedFile);
            try {
                const response = await fetch('http://localhost:8080/api/employees/upload', {
                    method: 'POST',
                    body: file,
                    headers: {},
                });
                if (response.ok) {
                    setIsFileUploaded(true);
                } else {
                    console.error('Upload failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }else{
            alert('Please select a file first!');
        }
    };

    const handleProcess = async () => {
        if (isFileUploaded) {
            try {
                const response = await fetch('http://localhost:8080/api/employees/process', {
                    method: 'POST',
                    headers: {},
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('File uploaded successfully');
                    onFileUpload(data);
                    setIsFileUploaded(false);
                } else {
                    console.error('Upload failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please select a file first!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                       htmlFor="file_input">Upload file</label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300"
                    aria-describedby="file_input_help" id="file_input" type="file"
                    accept=".csv, .xlsx, .xls" onChange={handleFileChange}>
                </input>
                <div className="flex items-center justify-center">
                    <button className="px-5 py-2 mt-4 text-sm font-medium text-white bg-gray-700 rounded-md"
                            type="button" onClick={handleUpload}>Upload</button>
                    {isFileUploaded && (
                        <button
                            className="px-5 py-2 ml-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-md "
                            type="button" onClick={handleProcess}>Process</button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default FileUploadComponent;