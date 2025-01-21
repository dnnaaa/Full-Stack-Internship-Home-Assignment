import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, value, onChange, className, type = 'text', required = false, error, ...rest }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        fullWidth
        variant="outlined"
        className="bg-blue-950 text-gray-300 rounded"
        error={!!error}
        helperText={error}
        InputLabelProps={{
          style: { color: '#b0bec5' },
        }}
        {...rest}
      />
    </div>
  );
};

export default Input;