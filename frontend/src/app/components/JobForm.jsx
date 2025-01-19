'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material'; 

const JobForm = ({ job, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
    });

    useEffect(() => {
        if (job) {
            setFormData({
                title: job.title || '',
                description: job.description || '',
                location: job.location || '',
                salary: job.salary || '',
            });
        }
    }, [job]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-4 text-center">
                {job?.id ? 'Edit Job' : 'Add Job'}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mb-4"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mb-4"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mb-4"
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Salary"
                        variant="outlined"
                        fullWidth
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="mb-4"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full sm:w-auto"
                    >
                        {job?.id ? 'Update Job' : 'Add Job'}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={onCancel}
                        className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
