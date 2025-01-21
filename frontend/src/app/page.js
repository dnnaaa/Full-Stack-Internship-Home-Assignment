"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);
//remplir table
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jobs'); 
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Job List</h1>
      <div className="flex justify-end">
  <Link href="/addjob">
    <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      New Job
    </button>
  </Link>
</div>
      <table className='table-auto w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 px-4 py-2'>Title</th>
            <th className='border border-gray-300 px-4 py-2'>Location</th>
            <th className='border border-gray-300 px-4 py-2'>Salary</th>
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className='text-center'>
              <td className='border border-gray-300 px-4 py-2'>{job.title}</td>
              <td className='border border-gray-300 px-4 py-2'>{job.location}</td>
              <td className='border border-gray-300 px-4 py-2'>${job.salary}</td>
              <td className='border border-gray-300 px-4 py-2'>
                <Link href={`/editjob/${job.id}`}>
                  <button className='bg-yellow-500 text-white px-3 py-1 rounded mr-2'>
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => deleteJob(job.id)}
                  className='bg-red-500 text-white px-3 py-1 rounded'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
