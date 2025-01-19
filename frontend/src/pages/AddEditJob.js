import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, createJob, updateJob } from '../services/jobService';
import { Button, TextField } from '@mui/material';

const AddEditJob = () => {
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await getJobById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch job:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateJob(id, job);
      } else {
        await createJob(job);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Job' : 'Add Job'}</h1>
      <TextField
        label="Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        required
      />
      <TextField
        label="Description"
        value={job.description}
        onChange={(e) => setJob({ ...job, description: e.target.value })}
        required
      />
      <TextField
        label="Location"
        value={job.location}
        onChange={(e) => setJob({ ...job, location: e.target.value })}
      />
      <TextField
        label="Salary"
        type="number"
        value={job.salary}
        onChange={(e) => setJob({ ...job, salary: e.target.value })}
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
};

export default AddEditJob;
