'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useJob } from '@/hooks/useJob';
import CircuralProgressBar from './CircuralProgressBar';
import { useFeedback } from '@/context/FeedbackContext';

const JobForm = ({ jobId }) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useFeedback();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  // Query for fetching job data when editing
  const { data: jobData, isLoading: isLoadingJob } = useJob(jobId);

  // Mutation for creating/updating job
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      const url = jobId
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${jobId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

      if (jobId) {
        return await axios.put(url, data);
      } else {
        return await axios.post(url, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      showToast(
        jobId ? 'Job updated successfully!' : 'Job created successfully!',
        'success'
      );
      push('/');
    },
  });

  useEffect(() => {
    if (jobData) {
      setFormData(jobData);
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (isLoadingJob) {
    return <CircuralProgressBar />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <CardContent sx={{ padding: '24px' }}>
          <Typography 
            variant='h5' 
            gutterBottom
            sx={{
              borderBottom: '2px solid #1976d2',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}
          >
            {jobId ? 'Edit Job' : 'Create New Job'}
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              name='title'
              label='Title'
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              margin='normal'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  }
                }
              }}
            />

            <TextField
              name='description'
              label='Description'
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              margin='normal'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  }
                }
              }}
            />

            <TextField
              name='location'
              label='Location'
              value={formData.location}
              onChange={handleChange}
              fullWidth
              margin='normal'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  }
                }
              }}
            />

            <TextField
              name='salary'
              label='Salary'
              type='number'
              value={formData.salary || ''}
              onChange={handleChange}
              fullWidth
              margin='normal'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  }
                }
              }}
            />

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end'
              }}>
              <Button 
                variant='outlined' 
                onClick={() => push('/')}
                sx={{
                  borderColor: '#e0e0e0',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                type='submit' 
                variant='contained' 
                disabled={isLoading}
                sx={{
                  boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)'
                  }
                }}
              >
                {jobId ? 'Update Job' : 'Create Job'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobForm;
