import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputAdornment,
} from '@mui/material';

function AddEditJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/${id}`);
      const job = response.data;
      setTitle(job.title);
      setDescription(job.description);
      setLocation(job.location);
      setSalary(job.salary);
    } catch (error) {
      toast.error('Failed to fetch job details!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    if (!title || !description) {
      toast.error('Title and Description are required!');
      return;
    }
  
    try {
      const jobData = { title, description, location, salary };
  
      if (id) {
        await axios.put(`${config.API_BASE_URL}/${id}`, jobData);
        toast.success('Job updated successfully!');
      } else {
        await axios.post(`${config.API_BASE_URL}`, jobData);
        toast.success('Job added successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error('Failed to save the job!');
    }
  };
  
  return (
    <Box
      p={4}
      component={Paper}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        boxShadow: 3,
        borderRadius: '8px',
        bgcolor: '#fafafa',
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        {id ? 'Edit Job' : 'Add Job'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Job Title */}
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                },
              }}
            />
          </Grid>

          {/* Job Description */}
          <Grid item xs={12}>
            <TextField
              label="Job Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                },
              }}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                },
              }}
            />
          </Grid>

          {/* Salary */}
          <Grid item xs={12}>
            <TextField
              label="Salary"
              variant="outlined"
              fullWidth
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  bgcolor: '#fff',
                },
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontWeight: 'bold',
                padding: '10px 0',
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              {id ? 'Update Job' : 'Add Job'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddEditJob;
