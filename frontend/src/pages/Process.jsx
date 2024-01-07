// pages/process.js
import React from 'react';
import ProcessButton from '../components/ProcessButton';

const ProcessPage = () => {
    const handleProceedClick = () => {
        // Add any specific logic you need before redirecting
        console.log('Processing Result..');
    };

    return (
        <div>
            <h1>Processing Page</h1>
            <ProcessButton onProcessClick={handleProceedClick} />
        </div>
    );
};

export default ProcessPage;
