import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      loadJobs(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div>
      <h1>Job Management</h1>
      <Button variant="contained" onClick={() => navigate('/add-job')}>
        Add Job
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit-job/${job.id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(job.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobList;
