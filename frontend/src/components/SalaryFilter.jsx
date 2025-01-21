import React, { useState } from 'react';
import { Slider, Typography, Box } from '@mui/material';
import Button from '../components/Button'; // Custom Button component


const SalaryFilter = ({ onFilter }) => {
  const [range, setRange] = useState([0, 100000]); // Set initial range

  const handleSliderChange = (event, newValue) => {
    setRange(newValue); // Update slider range
  };

  const handleFilter = () => {
    onFilter({ min: range[0], max: range[1] }); // Pass range values to filter function
  };

 
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={{ xs: 2, sm: 4 }}
      className="bg-blue-900 rounded-lg shadow-lg"
      sx={{ padding: '8px 16px', borderRadius: '25px', width: '100%' }}
    >
      {/* Title */}
      <Typography
        variant="body1"
        className="text-gray-300"
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Filter by Salary
      </Typography>

      {/* Slider */}
      <Slider
        value={range}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        className="text-blue-500"
        sx={{
          flex: 1, // Allow the slider to expand in available space
          maxWidth: { xs: '100%', sm: '150px' }, // Adjust width for responsiveness
          '& .MuiSlider-thumb': { color: '#0ea5e9' }, // Customize thumb color
          '& .MuiSlider-track': { color: '#0ea5e9' }, // Customize track color
          '& .MuiSlider-rail': { color: '#ccc' }, // Customize rail color
        }}
      />

      {/* Buttons */}
      <Box display="flex" gap={1} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          sx={{
            fontSize: '12px',
            padding: '4px 12px',
            borderRadius: '25px',
            textTransform: 'none',
            width: { xs: '100%', sm: 'auto' }, // Full width on smaller screens
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default SalaryFilter;
