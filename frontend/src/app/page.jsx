"use client";
import JobsTable from "@components/JobsTable";
import { 
  Button,
  Typography,
  Container,
  Box,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          padding: '24px',
        },
      },
    },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        className="min-h-screen py-12 px-4"
        sx={{ 
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2}>
            <Box className="mb-8 text-center">
              <Typography variant="h4" component="h1" className="font-semibold mb-2">
                Jobs Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage and track all your job listings in one place
              </Typography>
            </Box>

            <Box className="flex items-center justify-between mb-8">
              <Typography 
                variant="h6" 
                component="h2" 
                className="font-medium text-gray-900"
              >
                All Jobs
              </Typography>
              <Link href="add" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  Add New Job
                </Button>
              </Link>
            </Box>

            <JobsTable />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
