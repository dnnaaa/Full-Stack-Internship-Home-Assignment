import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import JobTable from "../components/JobTable";
import { useNavigate } from "react-router-dom";
import jobsApi from "../api/jobsApi";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    jobsApi
      .getJobs()
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleDelete = (id) => {
    jobsApi
      .deleteJob(id)
      .then(() => {
        setOpen(true);
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      })
      .catch((error) => console.error("Error deleting job:", error));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Job List
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => navigate("/jobs/add")}
        >
          New Job +
        </Button>
      </Box>
      <Box>
        <JobTable jobs={jobs} onDelete={handleDelete} />
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Job deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobListPage;
