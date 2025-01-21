import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'; // Importation de Link de next/link

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <AppBar
      position='sticky'
      className='bg-white m-4 w-4/5 mx-auto'
      color='default'
      style={{ borderRadius: '8px' }}>
      <Toolbar className='flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <img
            src='/trofel.webp'
            alt='Trofel'
            className='w-10 h-10 rounded-full'
          /><Typography variant="h6" style={{ color: '#333', fontWeight: 'bold' }}>
          LEFORT
        </Typography>
        
        </div>

        <div className='hidden md:flex space-x-4'>
          <Button
            color='inherit'
            component='a'
            href='https://trofel.vercel.app/'
            target='_blank' 
          >
            Portfolio
          </Button>
        </div>

        <div className='md:hidden'>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleMobileMenuOpen}
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}>
        <MenuItem
          onClick={handleMobileMenuClose}
          component='a'
          href='https://trofel.vercel.app/'
          target='_blank'  
        >
          Portfolio
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
