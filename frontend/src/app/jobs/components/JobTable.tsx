import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Job {
  id: number;
  title: string;
  location?: string;
  salary?: number;
}

interface JobTableProps {
  jobs: Job[];
  onDelete: (id: number) => void;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const router = useRouter();

  const handleUpdate = (id: number) => {
    router.push(`/jobs/edit?id=${id}`);
  };

  const handleOpenDialog = (job: Job) => {
    setJobToDelete(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setJobToDelete(null);
  };

  const handleDelete = () => {
    if (jobToDelete !== null) {
      onDelete(jobToDelete.id);
      handleCloseDialog();
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <TableContainer
        component={Paper}
        className='mt-4'
        sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className='text-center text-red-500'>
                No jobs available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer
      component={Paper}
      className='mt-4'
      sx={{ overflowX: 'auto' }}>
      <Table aria-label='responsive table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell className='text-center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location || 'N/A'}</TableCell>
              <TableCell>{job.salary ? `$ ${job.salary}` : 'N/A'}</TableCell>
              <TableCell className='text-center'>
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => handleUpdate(job.id)}>
                  Update
                </Button>
                <Button
                  variant='text'
                  color='error'
                  onClick={() => handleOpenDialog(job)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          {jobToDelete && (
            <p>
              Are you sure you want to delete the job "{jobToDelete.title}"?
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='error'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default JobTable;
