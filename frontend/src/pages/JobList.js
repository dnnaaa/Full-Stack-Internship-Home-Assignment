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
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add'; 

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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">
      <div className="p-4 md:p-6 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-300">
            Job Management
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/add-job')}
          >
            Add Job
          </Button>
        </div>

        {/* Responsive table container */}
        <TableContainer component={Paper} className="shadow-lg bg-gray-800">
          <Table className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="text-gray-300 font-medium">Title</TableCell>
                <TableCell className="text-gray-300 font-medium">Location</TableCell>
                <TableCell className="text-gray-300 font-medium">Salary</TableCell>
                <TableCell className="text-gray-300 font-medium">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-700 text-gray-300"
                >
                  <TableCell className="whitespace-nowrap">{job.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{job.location}</TableCell>
                  <TableCell className="whitespace-nowrap">{job.salary}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/edit-job/${job.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(job.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default JobList;
