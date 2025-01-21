'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import JobTable from './components/JobTable';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Job {
  id: number;
  title: string;
  description: string;
  location?: string;
  salary?: number;
}

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toastMessage = searchParams.get('toastMessage');
    if (toastMessage) {
      toast.success(decodeURIComponent(toastMessage));
    }

    // Charger les jobs
    fetch('http://localhost:8080/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Job[]) => {
        console.log('Jobs fetched:', data);
        setJobs(data);
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, [searchParams]);

  const handleDeleteJob = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        toast.success('Job deleted successfully!');
      } else {
        toast.error('Failed to delete the job.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting job.');
    }
  };

  return (
    <div className='p-4 sm:p-6 w-full sm:w-4/5 mx-auto'>
      <div className='flex flex-col sm:flex-row justify-between mb-4'>
        <h1 className='text-2xl font-bold mb-4 sm:mb-0 text-center'>
          Job List
        </h1>
        <Button
          variant='contained'
          color='success'
          className='w-1/5'
          onClick={() => router.push('/jobs/add')}
          sx={{
            minWidth: '120px',
            textAlign: 'center',
          }}>
          New Job +
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <JobTable jobs={jobs} onDelete={handleDeleteJob} />
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default JobListPage;
