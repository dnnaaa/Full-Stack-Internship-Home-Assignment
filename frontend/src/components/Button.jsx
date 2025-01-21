import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * Custom Button Component
 * A wrapper around Material-UI's Button component for consistent styling and reusability.
 *
 * @param {React.ReactNode} children - The content to display inside the button (e.g., text or icons).
 * @param {Function} onClick - Function to handle the button's click event.
 * @param {string} [className] - Additional CSS classes for custom styling.
 * @param {string} [variant='contained'] - Material-UI button variant ('contained', 'outlined', etc.).
 * @param {string} [color='primary'] - Material-UI button color ('primary', 'secondary', etc.).
 * @param {...Object} rest - Additional props to pass to the Material-UI Button component.
 */
const Button = ({
  children, // The content inside the button
  onClick, // Click event handler
  className, // Additional custom classes
  variant = 'contained', // Default variant for Material-UI button
  color = 'primary', // Default color for Material-UI button
  ...rest // Any other props
}) => {
  return (
    <MuiButton
      variant={variant} // Apply the variant
      color={color} // Apply the color
      className={`${className} text-white px-4 py-2 rounded`} // Add custom classes
      onClick={onClick} // Attach click handler
      {...rest} // Spread additional props
    >
      {children} {/* Render the button content */}
    </MuiButton>
  );
};

export default Button;
