import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: '#264653', alignItems: 'center',}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,}} >
            Job Management System
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
