import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/LightMode';

const HeaderComponent = ({ onToggleTheme, isDarkMode }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent', 
        boxShadow: 'none',             
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)', 
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            background: 'linear-gradient(to right, #00bcd4, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Job Management Application
        </Typography>

        {/* Dark Mode Toggle Button */}
        <IconButton
          sx={{
            color: isDarkMode ? '#fff' : '#000', 
          }}
          onClick={onToggleTheme}
          aria-label="toggle dark mode"
        >
          {isDarkMode ? <LightModeIcon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
