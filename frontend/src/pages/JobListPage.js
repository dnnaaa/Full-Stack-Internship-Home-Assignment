import React, { useEffect, useState } from 'react';
import { getAllJobs, deleteJob } from '../services/jobService';
import JobTable from '../components/JobTable';
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Paper } from '@mui/material';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [message, setMessage] = useState(''); // Snackbar message
  const [severity, setSeverity] = useState('success'); // Snackbar severity (success, error)
  const [openDialog, setOpenDialog] = useState(false); // Confirmation dialog state
  const [jobToDelete, setJobToDelete] = useState(null); // Store the job ID to be deleted

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await getAllJobs();
      setJobs(jobData);
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    setJobToDelete(jobId);
    setOpenDialog(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(jobToDelete);
      setMessage('Job deleted successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
      setOpenDialog(false); // Close the confirmation dialog
      // Refresh job list
      const jobData = await getAllJobs();
      setJobs(jobData);
    } catch (error) {
      setMessage('Failed to delete job');
      setSeverity('error');
      setOpenSnackbar(true);
      setOpenDialog(false); // Close the confirmation dialog
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the confirmation dialog without deleting
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#f4f4f9"
    >
      <Paper sx={{ padding: 3, width: '80%', maxWidth: '1000px', borderRadius: 2 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Job Listings</h1>
        
        <JobTable jobs={jobs} onDelete={handleDelete} />

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this job?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default JobListPage;
