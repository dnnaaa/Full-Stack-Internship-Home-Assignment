import React from 'react';
import { TextField } from '@mui/material';

/**
 * Custom Input Component
 * A reusable input field component using Material-UI's TextField.
 *
 * @param {string} label - The label for the input field.
 * @param {string | number} value - The current value of the input field.
 * @param {Function} onChange - Function to handle input changes.
 * @param {string} [className] - Additional classes for custom styling.
 * @param {string} [type='text'] - The type of the input field (e.g., 'text', 'number').
 * @param {boolean} [required=false] - Whether the input field is required.
 * @param {string} [error] - Error message for validation errors.
 * @param {...Object} rest - Additional props to pass to the TextField component.
 */
const Input = ({
  label,
  value,
  onChange,
  className,
  type = 'text',
  required = false,
  error,
  ...rest
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <TextField
        label={label} // Input label
        value={value} // Input value
        onChange={onChange} // Handler for input changes
        type={type} // Input type (e.g., text, number)
        required={required} // Mark input as required if true
        fullWidth // Input spans the full width of the container
        variant="outlined" // Material-UI outlined variant
        className="bg-blue-950 text-gray-300 rounded" // Tailwind CSS for background and text styling
        error={!!error} // Show error state if error prop is provided
        helperText={error} // Display error message below the input
        InputLabelProps={{
          style: { color: '#b0bec5' }, // Custom label color
        }}
        {...rest} // Pass additional props to the TextField
      />
    </div>
  );
};

export default Input;
