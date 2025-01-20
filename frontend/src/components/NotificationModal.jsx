"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
    },
  },
  typography: {
    body1: {
      color: '#1f2937',
      fontWeight: 500,
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  textAlign: 'center',
};

export default function NotificationModal({ message }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Notification
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              <p className="text-green-600">{message}</p>
            </Typography>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
