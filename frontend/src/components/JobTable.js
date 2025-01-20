import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import IconButton from '@mui/material/IconButton';  
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

const JobTable = ({ jobs, deleteJob }) => {
  return (
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
                    onClick={() => deleteJob(job.id)}
                    aria-label="delete"
                    >
                    <DeleteForeverTwoToneIcon />
                    </IconButton>

                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No jobs available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
