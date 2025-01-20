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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import PublicIcon from '@mui/icons-material/Public';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';


const JobTable = ({ jobs, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <TableContainer
      component={Paper}
      className="shadow-lg bg-gray-800 overflow-hidden"
      sx={{ borderRadius: '25px' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-gray-300 font-medium">Title</TableCell>
            <TableCell className="text-gray-300 font-medium">Location</TableCell>
            <TableCell className="text-gray-300 font-medium">Salary</TableCell>
            <TableCell className="text-gray-300 font-medium">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-gray-700 text-gray-300">
              <TableCell>
                <div className="flex items-center gap-2">
                  <WorkIcon fontSize="small" />
                  {job.title}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <PublicIcon fontSize="small" />
                  {job.location}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <AttachMoneyIcon fontSize="small" />
                  {job.salary}
                </div>
              </TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => navigate(`/edit-job/${job.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(job.id)}>
                  <DeleteIcon />
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
