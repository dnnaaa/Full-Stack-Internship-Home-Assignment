import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/**
 * SuccessModal Component
 * Displays a success message in a modal dialog with a confirmation button.
 *
 * @param {boolean} open - Determines whether the modal is open or closed.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message to display inside the modal.
 * @param {Function} onClose - Function to handle closing the modal.
 */
const SuccessModal = ({ open, title, message, onClose }) => {
  return (
    <Dialog
      TransitionComponent={Slide} // Apply a slide effect for the modal transition
      transitionDuration={{ enter: 500, exit: 500 }} // Control the timing of the slide animation
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px", // Apply custom border radius to the dialog
        },
      }}
      open={open} // Controls whether the dialog is open
      onClose={onClose} // Handles closing the dialog
      maxWidth="xs" // Limits the dialog width
      fullWidth // Ensures the dialog spans the full width within its max width
    >
      {/* Modal Title */}
      <DialogTitle className="text-center bg-blue-500">
        {/* Success Icon */}
        <CheckCircleIcon className="mb-0" fontSize="large" color="success" />
        <br />
        {title} {/* Display the provided title */}
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent className="text-center bg-blue-500">
        <DialogContentText
          style={{
            textAlign: "center", // Center the text
            fontSize: "16px", // Adjust font size
            color: "#fff", // White text color for contrast
            margin: "16px 0", // Vertical margin
          }}
        >
          {message} {/* Display the provided message */}
        </DialogContentText>
      </DialogContent>

      {/* Modal Actions */}
      <DialogActions
        className="bg-blue-500"
        style={{ justifyContent: "center" }} // Center align the action buttons
      >
        <Button
          className="hover:bg-blue-800" // Tailwind CSS hover effect
          onClick={onClose} // Call the onClose function on click
          color="primary" // Use primary theme color
          autoFocus // Automatically focus the button
          style={{
            borderRadius: "25px", // Rounded button style
            color: "white", // White text color
          }}
        >
          OK {/* Confirmation button text */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
