import React from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1} // Adjust for zero-based indexing
      onChange={handlePageChange}
      className="mt-4"
      color="primary"
    />
  );
};

export default PaginationComponent;
