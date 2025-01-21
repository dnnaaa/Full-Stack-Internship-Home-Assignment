'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useJobs } from '../hooks/useJobs';
import CircuralProgressBar from '../components/CircuralProgressBar';
import JobsTable from '../components/JobsTable';
import { useFeedback } from '../context/FeedbackContext';

export default function JobsPage() {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { showToast, showConfirmDialog } = useFeedback();

  const { data: jobs, isLoading } = useJobs();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      showToast('Job deleted successfully', 'success');
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const handleEdit = (id) => {
    push(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    showConfirmDialog(
      'Delete Job',
      'Are you sure you want to delete this job?',
      () => deleteMutation.mutate(id)
    );
  };

  if (isLoading) {
    return <CircuralProgressBar />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Jobs Listing</Typography>
        <Button variant='contained' onClick={() => push('/new')}>
          Add New Job
        </Button>
      </Box>

      <JobsTable
        jobs={jobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={() => push('/new')}
      />
    </Box>
  );
}
