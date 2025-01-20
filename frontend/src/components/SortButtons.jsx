import React from 'react';
import { Button } from '@mui/material';

const SortButtons = ({ sort, handleSortChange }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Button
        variant={sort === 'title,asc' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleSortChange('title,asc')}
      >
        Title ASC
      </Button>
      <Button
        variant={sort === 'title,desc' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleSortChange('title,desc')}
      >
        Title DESC
      </Button>
      <Button
        variant={sort === 'salary,asc' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleSortChange('salary,asc')}
      >
        Salary ASC
      </Button>
      <Button
        variant={sort === 'salary,desc' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => handleSortChange('salary,desc')}
      >
        Salary DESC
      </Button>
    </div>
  );
};

export default SortButtons;
