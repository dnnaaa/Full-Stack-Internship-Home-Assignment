import React, { useState, useEffect } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import JobForm from "../components/JobForm";
import { useParams, useNavigate } from "react-router-dom";
import jobsApi from "../api/jobsApi";

const JobEditPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    jobsApi
      .getJobById(id)
      .then((response) => setJob(response.data))
      .catch((error) => console.error("Error fetching job:", error));
  }, [id]);

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
      .updateJob(id, sanitizedJob)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => console.error("Error updating job:", error));
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
        submitLabel="Save"
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Job updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JobEditPage;
