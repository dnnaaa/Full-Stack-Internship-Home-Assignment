import React from 'react';
import { Button, IconButton } from '@mui/material'; // Import Button and IconButton components
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import AddIcon from '@mui/icons-material/Add'; // Icon for the Add Job button
import ViewListIcon from '@mui/icons-material/ViewList'; // Icon for the View List button
import GridViewIcon from '@mui/icons-material/GridView'; // Icon for the Grid View button
import { useTheme, useMediaQuery } from '@mui/material'; // Hooks for responsive behavior

/**
 * Header Component
 * Displays the header section of the Job Management page, including a title, toggle button, and Add Job button.
 *
 * @param {boolean} isFetchingAll - Indicates whether all jobs are being fetched or paginated jobs.
 * @param {Function} toggleFetchMode - Function to toggle between fetching all jobs and paginated jobs.
 */
const Header = ({ isFetchingAll, toggleFetchMode }) => {
  const navigate = useNavigate(); // Hook for navigation
  const theme = useTheme(); // Access the theme for responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Page title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Job Management
      </h1>

      {/* Toggle Fetch Mode Button */}
      {isSmallScreen ? (
        // Icon-only button for small screens
        <IconButton
          color="primary"
          onClick={toggleFetchMode} // Calls the toggle function
        >
          {isFetchingAll ? <GridViewIcon /> : <ViewListIcon />} {/* Dynamic icon */}
        </IconButton>
      ) : (
        // Full button for larger screens
        <Button
          variant="contained"
          color="primary"
          onClick={toggleFetchMode} // Calls the toggle function
          className="mb-4"
          sx={{ borderRadius: '50px' }} // Rounded button
          startIcon={isFetchingAll ? <GridViewIcon /> : <ViewListIcon />} // Adds dynamic icon
        >
          {isFetchingAll ? 'Jobs by Pages' : 'All Jobs'} {/* Dynamic button text */}
        </Button>
      )}

      {/* Add Job Button */}
      {isSmallScreen ? (
        // Icon-only button for small screens
        <IconButton
          color="primary"
          onClick={() => navigate('/add-job')} // Navigates to the Add Job page
        >
          <AddIcon /> {/* Add Job icon */}
        </IconButton>
      ) : (
        // Full button for larger screens
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/add-job')} // Navigates to the Add Job page
          startIcon={<AddIcon />} // Adds an icon to the button
          sx={{ borderRadius: '50px' }} // Rounded button
        >
          Add Job
        </Button>
      )}
    </div>
  );
};

export default Header;
