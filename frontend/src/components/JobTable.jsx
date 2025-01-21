import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";

const JobTable = ({ jobs, onDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState();

  const handleClickOpen = (id) => {
    setOpen(true);
    setJobId(id);
  };

  const handleClose = (confirmationStatus) => {
    setOpen(false);
    if (confirmationStatus === "yes") {
      onDelete(jobId);
    }
  };

  function PaperComponent(props) {
    const nodeRef = useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} ref={nodeRef} />
      </Draggable>
    );
  }

  return (
    <Box
      sx={{
        margin: "auto",
        padding: 3,
        maxWidth: 800,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 800 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Salary</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell align="center">{job.id}</TableCell>
              <TableCell align="left">{job.title}</TableCell>
              <TableCell align="center">
                {job.location ? job.location : ""}
              </TableCell>
              <TableCell align="center">
                {job.salary ? "$ " + job.salary : ""}
              </TableCell>
              <TableCell align="center">
                <Grid2 container spacing={1}>
                  <Grid2 size={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/jobs/edit/${job.id}`)}
                    >
                      Update
                    </Button>
                  </Grid2>
                  <Grid2 size={12}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleClickOpen(job.id)}
                    >
                      Delete
                    </Button>
                  </Grid2>
                </Grid2>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose("no")}>
            Cancel
          </Button>
          <Button onClick={() => handleClose("yes")}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobTable;
