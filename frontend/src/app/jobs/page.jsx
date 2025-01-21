'use client';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import JobTable from '../components/jobTable';
import Link from 'next/link';

export default function JobsListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = (deletedJobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== deletedJobId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Jobs List</h1>
      <Link href="/jobs/add">
        <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4">
          Add New Job
        </button>
      </Link>
      <JobTable jobs={jobs} onDelete={handleDelete} />
    </div>
  );
}
