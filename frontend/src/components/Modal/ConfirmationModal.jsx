import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog 
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '20px', // Adjust the borderRadius here
        },
      }} 
     open={open} 
     onClose={onCancel} 
     maxWidth="xs" 
     fullWidth
    >
      <DialogTitle className="text-center bg-blue-500">
        <WarningAmberIcon
          className="mb-0"
          fontSize="large"
          color="error"
        />
        <br />
        {title}
      </DialogTitle>
      <DialogContent className="text-center bg-blue-500">
        <DialogContentText
          style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#fff',
            margin: '16px 0',
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="bg-blue-500"
        style={{ justifyContent: 'center' }}
      >
        <Button
          className="hover:bg-blue-800"
          onClick={onCancel}
          color="primary"
          style={{
            borderRadius: '25px',
            color: 'white',
            transition: 'background-color 0.3s ease',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            borderRadius: '25px',
            color: 'red',
            '&:hover': {
              backgroundColor: '#ff0000', 
              color: 'white',
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
