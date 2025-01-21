import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import IconButton from '@mui/material/IconButton';  
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const JobTable = ({ jobs, deleteJob }) => {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleOpen = (jobId) => {
    setSelectedJobId(jobId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
  };

  const handleConfirmDelete = () => {
    deleteJob(selectedJobId); // Call delete function with selected job ID
    handleClose(); // Close the dialog
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="job table">
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
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>
                      {/* Edit icon */}
                      <Link to={`/edit-job/${job.id}`} style={{ textDecoration: 'none' }}>
                      <IconButton
                          sx={{
                          color: 'green',
                          }}
                          aria-label="edit"
                      >
                          <BorderColorTwoToneIcon />
                      </IconButton>
                      </Link>

                      {/* Delete icon */}
                      <IconButton
                      sx={{
                          color: 'red',
                          marginLeft: '10px',
                      }}
                      onClick={() => handleOpen(job.id)} // Open dialog on click
                      aria-label="delete"
                      >
                      <DeleteForeverTwoToneIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No jobs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              color: 'white',
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobTable;
