'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Container, Paper, Typography, Grid, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const JobForm = ({ jobId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/jobs/${jobId}`);
      if (!response.ok) throw new Error('Failed to fetch job details');
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const method = jobId ? 'PUT' : 'POST';
      const url = jobId ? `http://localhost:8080/jobs/${jobId}` : 'http://localhost:8080/jobs';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save job');
      toast.success('Job saved successfully!');
      router.push('/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job!');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: '#f4f6f8', 
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {jobId ? 'Edit Job' : 'Add New Job'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              name="salary"
              label="Salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
              fullWidth
              required
              sx={{ marginBottom: '1rem' }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={submitting}
                  sx={{ borderRadius: '8px', padding: '12px' }}
                >
                  {submitting ? 'Saving...' : 'Save'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => router.push('/jobs')}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ borderRadius: '8px', padding: '12px' }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default JobForm;
