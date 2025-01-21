import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle
} from '@mui/material';

function JobTable({ jobs, onEdit, onDelete, onCreate }) {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedJobId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJobId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedJobId);
    handleClose();
  };

  return (
    <div>
      <TableContainer sx={{ border: '1px solid black' }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{ border: '1px solid black' }}>ID</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Title</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Location</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Salary</TableCell>
              <TableCell sx={{ border: '1px solid black' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell sx={{ border: '1px solid black' }}>{job.id}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{job.title}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{job.location}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>${job.salary}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>
                  <Button
                    variant="contained"
                    style = {{marginRight: '8px', backgroundColor: '#a8dadc', padding: '8px 25px', border: '1px solid #264653', color: 'black', textTransform: 'capitalize',}}
                    onClick={() => onEdit(job.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    style = {{backgroundColor: '#ffb4a2', padding: '8px 25px', border: '1px solid #780000', color: 'black', textTransform: 'capitalize',}}
                    onClick={() => handleClickOpen(job.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus style={{color: 'red',}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobTable;
