import React, { useState } from "react";
import {
  Grid2,
  TextField,
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const JobForm = ({ job, setJob, handleSubmit, submitLabel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!job.title) newErrors.title = "Title is required";
    if (!job.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        padding: 3,
        maxWidth: 600,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
      component="form"
      onSubmit={handleFormSubmit}
    >
      <Typography variant="h5" component="h1" align="left" gutterBottom>
        {submitLabel === "Add" ? "Create new job" : "Update job"}
      </Typography>
      <Grid2
        container
        spacing={isMobile ? 1 : 4}
        sx={{
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Grid2 size={isMobile ? 12 : 6}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            placeholder="Enter the job title"
            value={job?.title || ""}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid2>

        <Grid2 size={isMobile ? 12 : 6}>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            placeholder="Enter the job location"
            value={job?.location || ""}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter the job description"
            value={job?.description || ""}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid2>

        <Grid2 size={isMobile ? 12 : 6}>
          <TextField
            fullWidth
            type="number"
            label="Salary"
            variant="outlined"
            placeholder="Enter the job salary"
            value={job?.salary || ""}
            onChange={(e) => setJob({ ...job, salary: e.target.value })}
          />
        </Grid2>

        {!isMobile && <Grid2 size={3}></Grid2>}

        <Grid2 size={isMobile ? 12 : 3}>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            size="medium"
            color="success"
            sx={{
              padding: 0.5,
              fontSize: "14px",
              marginTop: 2,
            }}
          >
            {submitLabel}
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default JobForm;
