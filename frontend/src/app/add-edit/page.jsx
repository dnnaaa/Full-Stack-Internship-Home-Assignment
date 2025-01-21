'use client';

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button, InputAdornment, TextareaAutosize, TextField, Typography } from "@mui/material";
import { createJob, getJobById, updateJob } from "@/app/services/api";
import { toast, ToastContainer } from "react-toastify";
import JobForm from "../components/JobForm";

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
                    <JobForm
                        jobData={jobData}
                        errors={errors}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        jobId={jobId}
                    />
                </div>

            </div>                  
        </Suspense>
    );

}
