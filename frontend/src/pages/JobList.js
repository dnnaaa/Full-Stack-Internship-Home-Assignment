import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-300 mb-6">Job Management</h1>
      <Button
        variant="contained"
        color="primary"
        className="mb-4"
        onClick={() => navigate('/add-job')}
      >
        Add Job
      </Button>
      <TableContainer component={Paper} className="shadow-lg bg-gray-800">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-gray-300">Title</TableCell>
              <TableCell className="text-gray-300">Location</TableCell>
              <TableCell className="text-gray-300">Salary</TableCell>
              <TableCell className="text-gray-300">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-gray-700">
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="mr-2"
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JobList;
