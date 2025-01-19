"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const AddJobPage = () => {
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/jobs', job)
      .then(() => router.push('/'))
      .catch(error => console.error('Error creating job:', error));
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Add Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <TextField
          label="Location"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
          fullWidth
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddJobPage;