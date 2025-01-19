import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob } from '../services/jobService';

const JobForm = ({ job }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && job) {
      setTitle(job.title || '');
      setDescription(job.description || '');
      setLocation(job.location || '');
      setSalary(job.salary || '');
    }
  }, [id, job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, description, location, salary };
    if (id) {
      await updateJob(id, jobData);
    } else {
      await createJob(jobData);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Salary"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <Button type="submit">{id ? 'Update' : 'Add'} Job</Button>
    </form>
  );
};

export default JobForm;
