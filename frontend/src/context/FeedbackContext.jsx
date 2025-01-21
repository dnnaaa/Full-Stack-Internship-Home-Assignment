import { createContext, useState, useContext } from 'react';
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const hideToast = () => {
    setToast({ ...toast, open: false });
  };

  const showConfirmDialog = (title, message, onConfirm) => {
    setModal({ open: true, title, message, onConfirm });
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    setModal({ ...modal, open: false });
  };

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <FeedbackContext.Provider value={{ showToast, showConfirmDialog }}>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={hideToast}
          severity={toast.severity}
          sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog 
        open={modal.open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
          }
        }}>
        <DialogTitle sx={{ padding: '20px 24px' }}>{modal.title}</DialogTitle>
        <DialogContent sx={{ padding: '0 24px 20px' }}>{modal.message}</DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color='primary' variant='contained'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);
