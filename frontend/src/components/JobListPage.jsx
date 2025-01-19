'use client';

import React, { useEffect, useState } from 'react';
import JobTable from './JobTable';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-9">
        <h1 className="text-2xl">Job List</h1>
        <button
          className="bg-lime-100 text-green-600 border border-green-600 py-2 px-7"
          onClick={() => router.push('/add-job')}
        >
          New Job
          <span className="ms-4">+</span>
        </button>
      </div>
      <JobTable jobs={jobs} />
    </div>
  );
};

export default JobListPage;
