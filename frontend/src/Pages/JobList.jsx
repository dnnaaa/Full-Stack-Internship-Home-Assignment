import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  
  useEffect(() => {
    fetchJobs();
  }, [page, sortBy, sortOrder]);
  
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_BASE_URL}`, {
        params: {
          page: page,
          size: 5,
          sortBy: `${sortBy}`,
          order: `${sortOrder}`,
        },
      });
      setJobs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (!error.response) {
        toast.error('Server is not reachable. Please check your connection.');
      } else {
        toast.error('Failed to fetch jobs!');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const handleDeleteClick = (id) => {
    setJobToDelete(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await axios.delete(`${config.API_BASE_URL}/${jobToDelete}`);
      setJobs(jobs.filter((job) => job.id !== jobToDelete)); 
      toast.success('Job deleted successfully!');
    } catch (error) {
      if (!error.response) {
        toast.error('Server is not reachable. Please check your connection.');
      } else {
        toast.error('Failed to delete job!');
      }
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };



  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box p={4}>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        mb={3}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary', 
            letterSpacing: '0.5px' 
          }}
        >
          Job List
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/jobs/add')}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1.5,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          Add Job
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
        <Table>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              {['ID', 'Title', 'Location', 'Salary'].map((column) => (
                <TableCell
                  key={column}
                  align="center"
                  sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => handleSort(column.toLowerCase())}
                >
                  {column}
                  {sortBy === column.toLowerCase() && (
                    <span style={{ marginLeft: '8px' }}>
                      {sortOrder === 'asc' ? '🔼' : '🔽'}
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell align="center">{job.id}</TableCell>
                <TableCell align="center">{job.title}</TableCell>
                <TableCell align="center">{job.location}</TableCell>
                <TableCell align="center">{job.salary}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(job.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          sx={{ mr: 1 }}
        >
          Prev
        </Button>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </Box>
      
      <Box mt={2} sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          Page {page + 1} of {totalPages}
        </Typography>
      </Box>

      {/* Modal for Delete Confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#D32F2F' }}>
          Delete Job?
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: '20px' }}>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to delete this job? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
          <Button onClick={handleDeleteCancel} color="primary" variant="outlined" sx={{ width: '100px' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="secondary" 
            variant="contained" 
            autoFocus
            sx={{ width: '100px', backgroundColor: '#D32F2F', '&:hover': { backgroundColor: '#C2185B' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default JobList;
