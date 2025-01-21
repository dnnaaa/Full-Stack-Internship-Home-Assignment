import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobService from '../services/JobService';

const JobForm = () => {
    const { id } = useParams();  
    const navigate = useNavigate();  

    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        salary:''
    });
    const [errors, setErrors] = useState({}); // To store validation errors

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id === '_add') return;
        setLoading(true);
        JobService.getJobById(id).then((res) => {
            setJob({
                title: res.data.title,
                description: res.data.description,
                location: res.data.location,
                salary:res.data.salary
            });
        })
        .catch(error => {
            console.error("Error fetching job:", error);        
        })
        .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!job.title) {
            formErrors.title = "Title is required.";
            isValid = false;
        }

        if (!job.description) {
            formErrors.description = "Description is required.";
            isValid = false;
        }
        setErrors(formErrors);
        return isValid;
    };

    const saveOrUpdateJob = (e) => {
        e.preventDefault();
        if (id === '_add') {
            JobService.createJob(job).then(() => {
                navigate('/jobs');
            });
        } else {
            JobService.updateJob(job, id).then(() => {
                navigate('/jobs');
            });
        }
    };

    const cancel = () => {
        navigate('/jobs');
    };

    const getTitle = () => {
        return id === '_add' ? (
            <h3 className="text-2xl font-bold text-center mb-4">Add Job</h3>
        ) : (
            <h3 className="text-2xl font-bold text-center mb-4">Update Job</h3>
        );
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                {getTitle()}
                <form onSubmit={saveOrUpdateJob}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            className={`form-control ${errors.title ? 'border-red-500' : "w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
                            placeholder="Enter job title"
                            required
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            className={`form-control ${errors.description ? 'border-red-500' :"w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
                            placeholder="Enter job description"
                            required
                        />
                         {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter job location"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={job.salary}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter salary"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                            Save
                        </button>
                        <button type="button" onClick={cancel} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
