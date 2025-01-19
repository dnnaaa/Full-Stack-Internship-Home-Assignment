import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, onClick, className, variant = 'contained', color = 'primary', ...rest }) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      className={`${className} text-white px-4 py-2 rounded`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
