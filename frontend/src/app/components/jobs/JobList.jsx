'use client';
import React, { useState, useEffect } from 'react';
import JobTable from './JobTable';
import { Button, CircularProgress, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/jobs`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/${jobIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete job');
      fetchJobs(); 
      toast.success('Job deleted successfully!');
      setOpen(false); 
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job!');
    }
  };

  const handleEdit = (id) => {
    router.push(`/jobs/${id}/edit`);
  };

  const handleDeleteDialogOpen = (id) => {
    setJobIdToDelete(id);
    setOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setOpen(false);
    setJobIdToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className="py-4">
      <Typography variant="h4" className="text-center mb-6">Job Listings</Typography>
      <Button
        onClick={() => router.push('/jobs/new')}
        variant="contained"
        color="primary"
        className="mb-4"
      >
        Add New Job
      </Button>
      <JobTable jobs={jobs} onEdit={handleEdit} onDelete={handleDeleteDialogOpen} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobList;
