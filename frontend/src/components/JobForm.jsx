import React, { useState, useEffect } from 'react';
import { createJob, getJobById, updateJob } from '../services/job';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getJobById(id).then((response) => setFormData(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.title.trim()) {
      validationErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      validationErrors.description = 'Description is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitAction = id ? updateJob(id, formData) : createJob(formData);
    submitAction.then(() => navigate('/'));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fafafa' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>
        {id ? 'Update Job' : 'Create New Job'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              required
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>

          {/* Salary */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ textTransform: 'none', paddingX: 4, }}
              style={{ marginBottom: '16px', backgroundColor: '#2a9d8f', padding: '8px 25px', border: '1px solid #264653', textTransform: 'capitalize',}}
            >
              {id ? 'Update' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default JobForm;
