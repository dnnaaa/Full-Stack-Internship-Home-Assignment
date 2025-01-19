'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const JobTable = ({ jobs, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="shadow-lg rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-semibold text-gray-700">Title</TableCell>
            <TableCell className="font-semibold text-gray-700">Location</TableCell>
            <TableCell className="font-semibold text-gray-700">Salary</TableCell>
            <TableCell align="right" className="font-semibold text-gray-700">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-gray-50">
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location || 'Remote'}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(job.id)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(job.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
