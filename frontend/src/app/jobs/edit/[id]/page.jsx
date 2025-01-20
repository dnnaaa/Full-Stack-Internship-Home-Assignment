"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Fade,
} from "@mui/material";
import {
  BusinessCenter,
  Description,
  LocationOn,
  AttachMoney,
  ArrowBack,
} from "@mui/icons-material";
import { Toast } from "@/app/components/toast";

export default function EditJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError("Failed to fetch job details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user makes changes
  };
  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };
  const handleCancel = () => {
    setToast({
      open: true,
      message: "Operation cancelled",
      severity: "info"
    });
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8080/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      setToast({
        open: true,
        message: "Job updated successfully!",
        severity: "success"
      });

      setTimeout(() => {
        router.push("/jobs");
      }, 1000);
    } catch (err) {
      setError("Failed to update job. Please try again.");
      setToast({
        open: true,
        message: "Failed to update job",
        severity: "error"
      });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <IconButton
        onClick={() => router.back()}
        sx={{ mb: 3 }}
        aria-label="go back"
      >
        <ArrowBack />
      </IconButton>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <BusinessCenter
            color="primary"
            sx={{ fontSize: 40, mb: 2 }}
          />
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
            Edit Job Posting
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Update the job posting details below
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {error && (
          <Fade in={true}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessCenter color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Job Description"
                variant="outlined"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Salary"
                variant="outlined"
                fullWidth
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '28px',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '28px',
                    boxShadow: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s',
                    },
                  }}
                >
                  {loading ? "Updating..." : "Update Job"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Toast 
        open={toast.open}
        handleClose={handleToastClose}
        message={toast.message}
        severity={toast.severity}
      />
    </Container>
  );
}