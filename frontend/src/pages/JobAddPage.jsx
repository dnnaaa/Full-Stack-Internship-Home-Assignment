import React, { useState } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";
import jobsApi from "../api/jobsApi";

const JobAddPage = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitizedJob = {
      ...job,
      title: job.title || null,
      location: job.location || null,
      description: job.description || null,
      salary: job.salary || null,
    };
    jobsApi
      .addJob(sanitizedJob)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => console.error("Error adding job:", error));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <JobForm
        job={job}
        setJob={setJob}
        handleSubmit={handleSubmit}
        submitLabel="Add"
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Job added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobAddPage;
