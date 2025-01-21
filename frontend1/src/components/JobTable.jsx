import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobService from '../services/JobService';

const JobTable = () => {
    const { id } = useParams();  
    const [job, setJob] = useState({});

    useEffect(() => {
        JobService.getJobById(id).then((res) => {
            setJob(res.data);  
        });
    }, [id]);  

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-bold text-center mb-6">View Job Details</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label className="font-semibold text-lg text-gray-700 w-1/3">Job Title:</label>
                        <div className="text-gray-800">{job.title}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-semibold text-lg text-gray-700 w-1/3">Job Description:</label>
                        <div className="text-gray-800">{job.description}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-semibold text-lg text-gray-700 w-1/3">Job Location:</label>
                        <div className="text-gray-800">{job.location}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="font-semibold text-lg text-gray-700 w-1/3">Job Salary:</label>
                        <div className="text-gray-800">{job.salary}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobTable;
