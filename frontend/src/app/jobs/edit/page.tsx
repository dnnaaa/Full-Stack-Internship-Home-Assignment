'use client';

import React, { useEffect, useState } from 'react';
import JobForm from '../components/JobForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Job {
  id: number;
  title: string;
  description: string;
  location?: string;
  salary?: number;
}

const EditJobPage: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  useEffect(() => {
    if (jobId) {
      fetch(`http://localhost:8080/jobs/${jobId}`)
        .then((response) => response.json())
        .then((data: Job) => setJob(data))
        .catch((error) => console.error(error));
    }
  }, [jobId]);

  const handleUpdateJob = async (jobData: Job) => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      if (response.ok) {
        router.push('/?toastMessage=Job+updated+successfully'); 
      } else {
        toast.error('Failed to updated the job.'); 
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating job.');
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Update Job</h1>
      <JobForm job={job} onSubmit={handleUpdateJob} />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EditJobPage;
