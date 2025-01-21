import React from 'react';
import {
  Dialog, // Main modal container
  DialogActions, // Section for action buttons
  DialogContent, // Section for main content
  DialogContentText, // Styled text for the content
  DialogTitle, // Modal header section
  Button, // Material-UI Button component
  Slide // Transition effect for modal
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Warning icon

/**
 * ConfirmationModal Component
 * Displays a confirmation dialog with customizable title, message, and actions.
 *
 * @param {boolean} open - Determines whether the modal is open.
 * @param {string} title - Title text for the modal.
 * @param {string} message - Message text inside the modal.
 * @param {Function} onConfirm - Function executed when the confirm button is clicked.
 * @param {Function} onCancel - Function executed when the cancel button is clicked.
 * @returns {JSX.Element}
 */
const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog
      TransitionComponent={Slide} // Apply a slide effect for the modal transition
      transitionDuration={{ enter: 500, exit: 500 }} // Control the timing of the slide animation
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '20px', // Customize modal border radius
        },
      }}
      open={open} // Controls the visibility of the dialog
      onClose={onCancel} // Triggered when the modal is closed
      maxWidth="xs" // Limits the modal's width to a small size
      fullWidth // Ensures the modal spans the full width within its max size
    >
      {/* Modal Header */}
      <DialogTitle className="text-center bg-blue-500">
        {/* Warning Icon */}
        <WarningAmberIcon
          className="mb-0" // Adds margin at the bottom of the icon
          fontSize="large" // Increases icon size
          color="error" // Applies error color to the icon
        />
        <br />
        {title} {/* Displays the provided title */}
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent className="text-center bg-blue-500">
        <DialogContentText
          style={{
            textAlign: 'center', // Centers the message text
            fontSize: '16px', // Adjusts font size for better readability
            color: '#fff', // Changes text color to white for contrast
            margin: '16px 0', // Adds vertical margin
          }}
        >
          {message} {/* Displays the provided message */}
        </DialogContentText>
      </DialogContent>

      {/* Modal Actions */}
      <DialogActions
        className="bg-blue-500"
        style={{ justifyContent: 'center' }} // Centers the action buttons
      >
        {/* Cancel Button */}
        <Button
          className="hover:bg-blue-800" // Adds a hover effect using Tailwind CSS
          onClick={onCancel} // Calls the cancel handler
          color="primary" // Uses the primary theme color
          style={{
            borderRadius: '25px', // Rounds the button edges
            color: 'white', // Sets the button text color to white
            transition: 'background-color 0.3s ease', // Smooth hover transition
          }}
        >
          Cancel
        </Button>

        {/* Delete Button */}
        <Button
          onClick={onConfirm} // Calls the confirm handler
          sx={{
            borderRadius: '25px', // Rounds the button edges
            color: 'red', // Sets the button text color to red
            '&:hover': {
              backgroundColor: '#ff0000', // Changes background color on hover
              color: 'white', // Changes text color to white on hover
            },
            transition: 'background-color 0.3s ease', // Smooth hover transition
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
