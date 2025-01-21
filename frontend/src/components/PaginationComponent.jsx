import React from 'react';
import Pagination from '@mui/material/Pagination';

/**
 * Component for handling pagination in the job list.
 * Displays pagination controls and triggers page changes on user interaction.
 *
 * @param {number} totalPages - The total number of pages available.
 * @param {number} currentPage - The current page (zero-based index).
 * @param {Function} handlePageChange - Function to handle page changes.
 */
const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Pagination
      count={totalPages} // Total number of pages for pagination
      page={currentPage + 1} // Adjust currentPage for zero-based indexing
      onChange={handlePageChange} // Trigger page change handler on user action
      className="mt-4" // Add margin at the top for spacing
      color="primary" // Use primary theme color for pagination
    />
  );
};

export default PaginationComponent;
