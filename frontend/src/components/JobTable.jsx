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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Icon for delete action
import EditIcon from '@mui/icons-material/Edit'; // Icon for edit action
import WorkIcon from '@mui/icons-material/Work'; // Icon for job title
import PublicIcon from '@mui/icons-material/Public'; // Icon for job location
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icon for salary
import { useNavigate } from 'react-router-dom'; // Navigation hook
import TableEmpty from '../components/TableEmpty'; // Component for empty table state

/**
 * Component for displaying a table of jobs.
 * Includes columns for title, location, salary, and actions (edit and delete).
 *
 * @param {Array} jobs - Array of job objects to display.
 * @param {Function} handleDelete - Function to handle the deletion of a job.
 */
const JobTable = ({ jobs, handleDelete }) => {
  const navigate = useNavigate(); // Hook for navigation
  const theme = useTheme(); // Material-UI theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

  return (
    <TableContainer
      component={Paper} // Material-UI paper for a card-like appearance
      className="shadow-lg overflow-auto" // Enable scrolling on smaller screens
      sx={{ borderRadius: '25px' }}
    >
      <Table className="bg-blue-900">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell className="text-gray-300 font-medium">Title</TableCell>
            {!isSmallScreen && (
              <>
                <TableCell className="text-gray-300 font-medium">
                  Location
                </TableCell>
                <TableCell className="text-gray-300 font-medium">
                  Salary
                </TableCell>
              </>
            )}
            <TableCell className="text-gray-300 font-medium">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {jobs.length === 0 ? (
            <TableEmpty /> // Render empty table component
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id} // Unique key for each row
                className="hover:bg-blue-500 text-gray-300" // Hover effect
              >
                {/* Job Title Column */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <WorkIcon fontSize="small" />
                    {job.title}
                  </div>
                </TableCell>

                {/* Job Location Column (Hidden on Small Screens) */}
                {!isSmallScreen && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <PublicIcon fontSize="small" />
                      {job.location}
                    </div>
                  </TableCell>
                )}

                {/* Job Salary Column (Hidden on Small Screens) */}
                {!isSmallScreen && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AttachMoneyIcon fontSize="small" />
                      {job.salary}
                    </div>
                  </TableCell>
                )}

                {/* Actions Column */}
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => navigate(`/edit-job/${job.id}`)} // Navigate to edit page
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(job.id)} // Handle delete action
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
