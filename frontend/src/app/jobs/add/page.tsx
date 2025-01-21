'use client';

import React from 'react';
import JobForm from '../components/JobForm';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJobPage: React.FC = () => {
  const router = useRouter();

  const handleAddJob = async (jobData: {
    title: string;
    description: string;
    location?: string;
    salary?: number;
  }) => {
    try {
      const response = await fetch('http://localhost:8080/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        router.push('/?toastMessage=Job+added+successfully');
      } else {
        toast.error('Failed to added the job.');
      }
    } catch (error) {
      console.error('Error adding job:', error); 
      toast.error('Error adding the job.');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Create new job</h1>
      <JobForm onSubmit={handleAddJob} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AddJobPage;
