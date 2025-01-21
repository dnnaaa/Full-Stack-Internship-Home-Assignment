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
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete action
import EditIcon from '@mui/icons-material/Edit'; // Icon for edit action
import WorkIcon from '@mui/icons-material/Work'; // Icon for job title
import PublicIcon from '@mui/icons-material/Public'; // Icon for job location
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icon for salary
import { useNavigate } from 'react-router-dom'; // Navigation hook

/**
 * Component for displaying a table of jobs.
 * Includes columns for title, location, salary, and actions (edit and delete).
 *
 * @param {Array} jobs - Array of job objects to display.
 * @param {Function} handleDelete - Function to handle the deletion of a job.
 */
const JobTable = ({ jobs, handleDelete }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <TableContainer
      component={Paper} // Material-UI paper for a card-like appearance
      className="shadow-lg overflow-hidden" // Tailwind CSS for styling
      sx={{ borderRadius: '25px' }} // Material-UI custom border radius
    >
      <Table className="bg-blue-900">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell className="text-gray-300 font-medium">Title</TableCell>
            <TableCell className="text-gray-300 font-medium">Location</TableCell>
            <TableCell className="text-gray-300 font-medium">Salary</TableCell>
            <TableCell className="text-gray-300 font-medium">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id} // Unique key for each row
              className="hover:bg-blue-500 text-gray-300" // Tailwind for hover effect and text color
            >
              {/* Job Title Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <WorkIcon fontSize="small" /> {/* Icon for job title */}
                  {job.title}
                </div>
              </TableCell>

              {/* Job Location Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <PublicIcon fontSize="small" /> {/* Icon for job location */}
                  {job.location}
                </div>
              </TableCell>

              {/* Job Salary Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <AttachMoneyIcon fontSize="small" /> {/* Icon for salary */}
                  {job.salary}
                </div>
              </TableCell>

              {/* Actions Column */}
              <TableCell>
                {/* Edit Button */}
                <IconButton
                  color="secondary"
                  onClick={() => navigate(`/edit-job/${job.id}`)} // Navigate to the edit job page
                >
                  <EditIcon />
                </IconButton>

                {/* Delete Button */}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(job.id)} // Trigger delete handler
                >
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
