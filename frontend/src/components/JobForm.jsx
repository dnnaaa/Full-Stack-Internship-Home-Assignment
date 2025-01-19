'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const JobForm = ({ jobId }) => {
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const router = useRouter();

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/jobs/${jobId}`);
          setJob(response.data);
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = jobId ? 'PUT' : 'POST';
    const url = jobId ? `http://localhost:8080/jobs/${jobId}` : 'http://localhost:8080/jobs';

    try {
      await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: job,
      });

      router.push('/');
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-9">{jobId ? 'Update Job' : 'Create New Job'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="block mb-2">Title</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
            />
          </div>
          <div className="w-1/2 ml-12">
            <label className="block mb-2">Location</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-4 row">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
          />
        </div>


        <div className="flex items-end justify-between mb-4">
          <div className="w-1/2">
            <label className="block mb-2">Salary</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={job.salary}
              onChange={(e) => setJob({ ...job, salary: e.target.value })}
            />
          </div>
          <div className="w-1/2 ml-12 text-end">
            <button
              type="submit"
              className="bg-lime-100 text-green-600 border border-green-600 py-1 px-7"
            >
              {jobId ? 'Save' : 'Add Job'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default JobForm;
