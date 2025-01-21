import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import JobService from '../services/JobService';
import { Box, TextField, Button, Typography, Container, Card, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const AddEditJobPage = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Save or update job
    const saveOrUpdateJob = (e) => {
        e.preventDefault();

        const job = { title, location, description, salary };

        if (id) {
            // Update existing job
            JobService.updateJob(id, job)
                .then(() => {
                    toast.success('Job updated successfully!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error updating job:', error);
                    toast.error('Failed to update job!');
                });
        } else {
            // Create new job
            JobService.createJob(job)
                .then(() => {
                    toast.success('Job created successfully!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error creating job:', error);
                    toast.error('Failed to create job!');
                });
        }
    };

    // Fetch job data if editing
    useEffect(() => {
        if (id) {
            JobService.getJobById(id)
                .then((response) => {
                    const job = response;
                    setTitle(job.title || '');
                    setLocation(job.location || '');
                    setDescription(job.description || '');
                    setSalary(job.salary || '');
                })
                .catch((error) => {
                    console.error('Error fetching job:', error);
                });
        }
    }, [id]);

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Card sx={{ p: 4, boxShadow: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {id ? 'Update Job' : 'Create New Job'}
                </Typography>
                <Box
                    component="form"
                    onSubmit={saveOrUpdateJob}
                    sx={{
                        '& .MuiTextField-root': { my: 2 },
                    }}
                >
                    <Grid container spacing={2}>
                        {/* Title and Location fields */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                variant="outlined"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>

                        {/* Description field */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>

                        {/* Salary field */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Salary"
                                variant="outlined"
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: 1,
                            }}
                        >
                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    px: 4,
                                    height: 40,
                                    background: 'linear-gradient(to right, #00bcd4, #2196f3)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #2196f3, #00bcd4)',
                                    },
                                }}
                            >
                                {id ? 'Save' : 'Add'}
                            </Button>

                            {/* Cancel Button */}
                            <Button
                            variant="outlined"
                            component={Link}
                            to="/"
                            sx={{
                                px: 4,
                                height: 40,
                                ml: 1,
                                borderColor: 'linear-gradient(to right, #00bcd4, #2196f3)',
                                color: 'linear-gradient(to right, #00bcd4, #2196f3)',
                            }}
                            >
                            Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Container>
    );
};

export default AddEditJobPage;
