import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


const Header = ({ isFetchingAll, toggleFetchMode }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-300">
        Job Management
      </h1>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleFetchMode}
        className="mb-4"
        sx={{ borderRadius: '50px' }}
      >
        {isFetchingAll ? 'Jobs by Pages' : 'All Jobs'}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-job')}
        startIcon={<AddIcon />}
        sx={{ borderRadius: '50px' }}
      >
        Add Job
      </Button>
    </div>
  );
};

export default Header;
