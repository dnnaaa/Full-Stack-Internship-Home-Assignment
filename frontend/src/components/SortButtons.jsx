import React from 'react';
import { Button } from '@mui/material';

/**
 * Component for rendering sorting buttons.
 * Allows users to sort the job list by title or salary in ascending or descending order.
 *
 * @param {string} sort - The current sorting criteria (e.g., 'title,asc').
 * @param {Function} handleSortChange - Function to update the sorting criteria.
 */
const SortButtons = ({ sort, handleSortChange }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {/* Sort by title in ascending order */}
      <Button
        variant={sort === 'title,asc' ? 'contained' : 'outlined'} // Highlight active sort
        color="primary"
        onClick={() => handleSortChange('title,asc')} // Update sort state
      >
        Title ASC
      </Button>

      {/* Sort by title in descending order */}
      <Button
        variant={sort === 'title,desc' ? 'contained' : 'outlined'} // Highlight active sort
        color="primary"
        onClick={() => handleSortChange('title,desc')} // Update sort state
      >
        Title DESC
      </Button>

      {/* Sort by salary in ascending order */}
      <Button
        variant={sort === 'salary,asc' ? 'contained' : 'outlined'} // Highlight active sort
        color="primary"
        onClick={() => handleSortChange('salary,asc')} // Update sort state
      >
        Salary ASC
      </Button>

      {/* Sort by salary in descending order */}
      <Button
        variant={sort === 'salary,desc' ? 'contained' : 'outlined'} // Highlight active sort
        color="primary"
        onClick={() => handleSortChange('salary,desc')} // Update sort state
      >
        Salary DESC
      </Button>
    </div>
  );
};

export default SortButtons;
