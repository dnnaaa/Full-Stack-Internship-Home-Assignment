'use client';

import React, { useEffect, useState } from 'react';
import JobTable from './JobTable';
import JobForm from './JobForm';
import axios from 'axios';
import { Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';  // Material UI components

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleFormSubmit = async (job) => {
        try {
            if (job.id) {
                
                await axios.put(`http://localhost:8080/jobs/${job.id}`, job);
                setJobs((prevJobs) =>
                    prevJobs.map((j) => (j.id === job.id ? job : j))
                );
                setSnackbarMessage('Job updated successfully');
                setSnackbarSeverity('success');
            } else {
                
                const response = await axios.post('http://localhost:8080/jobs', job);
                setJobs((prevJobs) => [...prevJobs, response.data]);
                setSnackbarMessage('Job added successfully');
                setSnackbarSeverity('success');
            }
            setEditingJob(null);
        } catch (error) {
            console.error('Error submitting job:', error);
            setSnackbarMessage('Error occurred');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleDelete = async () => {
        try {
            console.log('Deleting job with ID:', jobToDelete.id);
            await axios.delete(`http://localhost:8080/jobs/${jobToDelete.id}`);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobToDelete.id));
            setSnackbarMessage('Job deleted successfully');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error deleting job:', error);
            setSnackbarMessage('Error occurred while deleting job');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true);
            setOpenDeleteDialog(false);
        }
    };

    const handleDeleteConfirmation = (job) => {
        setJobToDelete(job);
        setOpenDeleteDialog(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 text-center">Job Management App</h1>
            {editingJob ? (
                <JobForm
                    job={editingJob}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setEditingJob(null)}
                />
            ) : (
                <div>
                    

                    
                    <div className="overflow-x-auto max-w-7xl w-full mx-auto">
                    <div className="mb-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEditingJob({})}
                            className="ml-0" 
                        >
                            Add Job
                        </Button>
                    </div>
                        
                        <JobTable
                            jobs={jobs}
                            onEdit={setEditingJob}
                            onDelete={handleDeleteConfirmation}
                        />
                    </div>
                </div>
            )}

            
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this job?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default JobListPage;
