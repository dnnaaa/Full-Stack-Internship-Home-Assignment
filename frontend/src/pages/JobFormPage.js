import React, { useEffect, useState } from 'react';
import JobForm from '../components/JobForm';
import { getJobById } from '../services/jobService';
import { useParams } from 'react-router-dom';

const JobFormPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        const jobData = await getJobById(id);
        setJob(jobData);
      };
      fetchJob();
    }
  }, [id]);

  return (
    <div>
      <h1>{id ? 'Edit Job' : 'Add Job'}</h1>
      {job ? (
        <JobForm job={job} /> // Ensure job is passed as a prop only if it exists
      ) : (
        <JobForm /> // Display JobForm without job prop if it is null or undefined
      )}
    </div>
  );
};

export default JobFormPage;
