import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import AddIcon from '@mui/icons-material/Add'; // Icon for the Add Job button
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

/**
 * Header Component
 * Displays the header section of the Job Management page, including a title, toggle button, and Add Job button.
 *
 * @param {boolean} isFetchingAll - Indicates whether all jobs are being fetched or paginated jobs.
 * @param {Function} toggleFetchMode - Function to toggle between fetching all jobs and paginated jobs.
 */
const Header = ({ isFetchingAll, toggleFetchMode }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Page title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Job Management
      </h1>

      {/* Toggle Fetch Mode Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleFetchMode} // Calls the toggle function
        className="mb-4"
        sx={{ borderRadius: '50px' }} // Rounded button
        startIcon={isFetchingAll ? <GridViewIcon /> : <ViewListIcon />}
      >
        {isFetchingAll ? 'Jobs by Pages' : 'All Jobs'} {/* Dynamic button text */}
      </Button>

      {/* Add Job Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-job')} // Navigates to the Add Job page
        startIcon={<AddIcon />} // Adds an icon to the button
        sx={{ borderRadius: '50px' }} // Rounded button
      >
        Add Job
      </Button>
    </div>
  );
};

export default Header;
