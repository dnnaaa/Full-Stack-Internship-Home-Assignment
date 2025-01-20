import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobService from '../services/JobService';
import JobTable from '../components/JobTable';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography'; 
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = () => {
    JobService.getAllJobs()
      .then((response) => {
        setJobs(response); 
        console.log('API Response:', response);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  };

  const deleteJob = (jobId) => {
    JobService.deleteJob(jobId)
      .then(() => {
        getAllJobs(); 
        toast.success('Job deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job!');
      });
  };

  return (
<Box
  sx={{
    padding: 4,
    minHeight: '100vh',
  }}
>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
    <Typography
      variant="h4"
      component="h2"
      align="left"
    >
      Job List
    </Typography>
    <Button
      startIcon={<AddIcon />}
      variant="contained"
      component={Link}
      to="/add-job"
      sx={{
        background: 'linear-gradient(to right, #00bcd4, #2196f3)',
        textTransform: 'none',
      }}
    > Add Job
    </Button>
  </Box>
  {/* Pass the jobs and deleteJob function as props */}
  <JobTable jobs={jobs} deleteJob={deleteJob} />
</Box>

  );
};

export default JobListPage;
