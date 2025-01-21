import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessModal = ({ open, title, message, onClose }) => {
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
        },
      }}
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle className="text-center bg-blue-500">
        <CheckCircleIcon className="mb-0" fontSize="large" color="success" />
        <br />
        {title}
      </DialogTitle>
      <DialogContent className="text-center bg-blue-500">
        <DialogContentText
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#fff",
            margin: "16px 0",
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="bg-blue-500"
        style={{ justifyContent: "center" }}
      >
        <Button
          className="hover:bg-blue-800"
          onClick={onClose}
          color="primary"
          autoFocus
          style={{ borderRadius: "25px", color: "white" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
