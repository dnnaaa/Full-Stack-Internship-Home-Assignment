import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../services/job';
import JobTable from './JobTable';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    getJobs().then(response => setJobs(response.data));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteJob(id).then(() => fetchJobs());
  };

  const handleCreate = () => {
    navigate('/new');
  };

  return (
    <Container style={{ paddingBottom: '50px',}}>
      <div style={{ marginTop: '60px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography variant="h4" gutterBottom>Job List</Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          style={{ marginBottom: '16px', backgroundColor: '#2a9d8f', padding: '8px 25px', border: '1px solid #264653', textTransform: 'capitalize',}}
        >
          New Job +
        </Button>
      </div>
      
      <JobTable jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
}

export default JobList;
