import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobService from '../services/JobService';

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();  

    useEffect(() => {
        JobService.getJobs().then((res) => {
            setJobs(res.data);
        })
        .catch((error) => {
            console.error('Error fetching jobs:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const deleteJob = (id) => {
        JobService.deleteJob(id).then(() => {
            setJobs(jobs.filter(job => job.id !== id));
        });
    };

    const viewJob = (id) => {
        navigate(`/view-job/${id}`);  
    };

    const editJob = (id) => {
        navigate(`/add-job/${id}`);  
    };

    const addJob = () => {
        navigate('/add-job/_add');  
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Job List</h2>
            <div className="mb-4">
                <button 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={addJob}> 
                    Add Job
                </button>
            </div>
            
            {loading ? ( 
                <div className="text-center">
                    <p>Loading jobs...</p>
                </div>
            ) : jobs.length === 0 ? ( 
                <div className="text-center">
                    <p>No jobs available. Please add some jobs.</p>
                </div>
            ) : ( // Render the table if jobs are available
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center border-b">Job Id</th>
                                <th className="px-4 py-2 text-center border-b">Job Title</th>
                                <th className="px-4 py-2 text-center border-b">Job Description</th>
                                <th className="px-4 py-2 text-center border-b">Job Location</th>
                                <th className="px-4 py-2 text-center border-b">Job Salary</th>
                                <th className="px-4 py-2 text-center border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id}>
                                    <td className="text-center border px-4 py-2">{job.id}</td>
                                    <td className="text-center border px-4 py-2">{job.title}</td>
                                    <td className="text-center border px-4 py-2">{job.description}</td>
                                    <td className="text-center border px-4 py-2">{job.location}</td>
                                    <td className="text-center border px-4 py-2">{job.salary}</td>
                                    <td className="text-center border px-4 py-2">
                                        <button
                                            onClick={() => editJob(job.id)} 
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                                            Update
                                        </button>
                                        <button 
                                            style={{ marginLeft: "10px" }} 
                                            onClick={() => deleteJob(job.id)} 
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                        <button 
                                            style={{ marginLeft: "10px" }} 
                                            onClick={() => viewJob(job.id)} 
                                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default JobListPage;
