"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Button,
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  Skeleton,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import {
  LocationOn,
  AttachMoney,
  Business,
  Schedule,
  Update,
  ArrowBack,
  Edit,
  Delete
} from "@mui/icons-material";
import { Toast } from "../../components/toast";

export default function JobDetailsPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const res = await fetch(`http://localhost:8080/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobDetails();
  }, [id]);

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };
  const handleCancel = () => {
    setToast({
      open: true,
      message: "Operation cancelled",
      severity: "info"
    });
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/jobs/${job.id}`, {
        method: "DELETE",
      });
      setDeleteDialogOpen(false);
      setToast({
        open: true,
        message: "Job deleted successfully!",
        severity: "success"
      });

      setTimeout(() => {
        router.push("/jobs");
      }, 1000);
    } catch (error) {
      console.error("Failed to delete job:", error);
      setToast({
        open: true,
        message: "Failed to delete job",
        severity: "error"
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Skeleton variant="text" height={60} />
          <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} key={item}>
                  <Skeleton variant="rectangular" height={80} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Job not found or error loading data
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 4 }}
      >
        Back to Jobs
      </Button>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 4 }}>
          <Typography variant="h4" gutterBottom>
            {job.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<Business />}
              label={job.location}
              color="default"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}
            />
            <Chip
              icon={<AttachMoney />}
              label={`${job.salary}`}
              color="default"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}
            />
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
            Job Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            {job.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Location</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {job.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Salary</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    ${job.salary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Posted Date</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {new Date(job.postedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Update color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Last Updated</Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {new Date(job.updatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              onClick={() => router.push(`/jobs/edit/${id}`)}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: '28px',
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() =>setDeleteDialogOpen(true)}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: '28px',
                '&:hover': {
                  bgcolor: 'error.dark',
                }
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            px: 2
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job posting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button 
            onClick={handleCancel}
            variant="outlined"
            sx={{ borderRadius: '20px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: '20px' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Toast 
        open={toast.open}
        handleClose={handleToastClose}
        message={toast.message}
        severity={toast.severity}
      />
    </Container>
  );
}