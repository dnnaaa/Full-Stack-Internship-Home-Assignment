"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import Link from 'next/link';
import JobTable from '../components/JobTable';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/jobs/${id}`)
      .then(() => setJobs(jobs.filter(job => job.id !== id)))
      .catch(error => console.error('Error deleting job:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Job List
      </Typography>
      <Link href="/add" passHref>
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          Add Job
        </Button>
      </Link>
      <JobTable jobs={jobs} onDelete={handleDelete} />
    </div>
  );
};

export default JobListPage;