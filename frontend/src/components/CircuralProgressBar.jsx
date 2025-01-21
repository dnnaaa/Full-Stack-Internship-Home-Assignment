import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const CircuralProgressBar = () => {
  return (
    <Stack
      sx={{ p: 3, height: '100vh', width: '100%' }}
      alignItems='center'
      justifyContent='center'>
      <CircularProgress />
    </Stack>
  );
};

export default CircuralProgressBar;
