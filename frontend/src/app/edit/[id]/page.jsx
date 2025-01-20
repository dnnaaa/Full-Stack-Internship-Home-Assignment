"use client";
import { 
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  InputAdornment,
  ThemeProvider,
  createTheme
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobByID, updateJob } from "@/service/service";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    success: {
      main: '#16a34a',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        }
      }
    }
  }
});

export default function EditPage({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    salary: ''
  });

  useEffect(() => {
    getJobByID(params.id).then((data) => {
      setFormData({
        title: data.title,
        location: data.location,
        description: data.description,
        salary: data.salary
      });
    });
  }, [params.id]);

  const router = useRouter();

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    salary: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (formData.salary && Number(formData.salary) <= 0) {
        newErrors.salary = 'Salary must be a positive number.';
      }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      await updateJob(params.id, formData);
      await router.push('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        className="min-h-screen py-12 px-4 flex items-center justify-center"
        sx={{ 
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} className="p-8 border border-gray-100">
            <Box className="mb-8 text-center">
              <Typography variant="h4" component="h1" className="font-semibold mb-2">
                Edit Job
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Modify the details below to update the job listing
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="title"
                    variant="outlined"
                    value={formData.title}
                    error={!!errors.title}
                    helperText={errors.title}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkOutlineIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    variant="outlined"
                    value={formData.location}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.description}
                    error={!!errors.description}
                    helperText={errors.description}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    type="number"
                    variant="outlined"
                    value={formData.salary}
                    error={!!errors.salary}
                    helperText={errors.salary}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaidIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} className="flex items-center justify-center md:justify-end">
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleSubmit}
                    className="mt-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
