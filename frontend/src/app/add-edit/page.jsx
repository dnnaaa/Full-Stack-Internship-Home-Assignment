'use client';

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button, InputAdornment, TextareaAutosize, TextField, Typography } from "@mui/material";
import { createJob, getJobById, updateJob } from "@/app/services/api";
import { toast, ToastContainer } from "react-toastify";

export default function AddEditJobPage() {

    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
    });
    const router = useRouter();
    const [jobId, setJobId] = useState(null);
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        if (id) {
            setJobId(id);
            const fetchJob = async () => {
            try {
              const data = await getJobById(id);  
              setJobData(data);  
            } catch (error) {
              console.error("Erreur lors de la récupération des données du job", error);
            }
          };
          fetchJob();
        }
    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                return !value.trim() ? 'Title is required' : '';
            case 'description':
                return !value.trim() ? 'Description is required' : 
                value.length < 10 ? 'Description must be at least 10 characters long' : '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(jobData).forEach(key => {
            newErrors[key] = validateField(key, jobData[key]);
        });
        setErrors(newErrors);

        return Object.values(newErrors).every(error => !error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
        const methode = jobId? 'PUT':'POST';
        try {
            let response;
            if(methode == 'POST'){
                response = await createJob(jobData);
            }else if(methode == 'PUT'){
                response = await updateJob(jobId, jobData);
            }

            if(response){
                //Store the notification in localStorage
                localStorage.setItem('jobNotification', JSON.stringify({
                    message: methode === 'POST' ? 'Job created successfully!' : 'Job updated successfully!',
                    type: 'success'
                }));
                router.push('/');
            }else{
                toast.error("An error occurred during submission.");
            }
        } catch (error) {
            toast.error("An error occurred during submission.");
            console.error(error)
            
        }


    }
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen p-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg p-6">
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Typography variant="h4" className="text-2xl font-medium mb-6">
                        {jobId ? 'Update Job' : 'Create new job'}
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <TextField
                                    fullWidth
                                    label="Title *"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleChange}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    />
                                </div>
                                <div>
                                    <TextField
                                    fullWidth
                                    label="Location (optional)"
                                    name="location"
                                    value={jobData.location}
                                    onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <TextField
                                fullWidth
                                label="Description *"
                                name="description"
                                value={jobData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description}
                                />
                            </div>
                            <div>
                                <TextField
                                fullWidth
                                label="Salary (optional)"
                                name="salary"
                                value={jobData.salary}
                                onChange={handleChange}
                                type="number"
                                error={!!errors.salary}   
                                inputProps={{min: 0, step: 0.01,}}
                                helperText={errors.salary}
                                InputProps={{
                                    inputMode: 'decimal',
                                    startAdornment: ( 
                                        <InputAdornment position="start">$</InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 font-semibold normal-case bg-green-100 text-green-800 hover:bg-green-200"
                            >
                                {jobId ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>                  
        </Suspense>
    );

}
