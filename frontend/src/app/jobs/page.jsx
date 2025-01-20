"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  LinearProgress,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Menu,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Toast } from "@/app/components/toast";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Filters
  const [searchTitle, setSearchTitle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const router = useRouter();
  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/jobs");
      const data = await res.json();
      setJobs(data);
      const locations = [...new Set(data.map((job) => job.location))];
      setAllLocations(locations);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setToast({
      open: true,
      message: "Operation cancelled",
      severity: "info"
    });
    setDeleteDialogOpen(false)
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTitle) params.append("title", searchTitle);
      if (filterLocation) params.append("location", filterLocation);
      if (minSalary) params.append("minSalary", minSalary);
      if (maxSalary) params.append("maxSalary", maxSalary);

      const res = await fetch(`http://localhost:8080/jobs/filter?${params.toString()}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch filtered jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionsClick = (event, jobId) => {
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
    setSelectedJobId(null);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
    handleActionsClose();
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/jobs/${jobToDelete.id}`, {
        method: "DELETE",
      });
      setJobs(jobs.filter((job) => job.id !== jobToDelete.id));
      setDeleteDialogOpen(false);
      setToast({
        open: true,
        message: "Job deleted successfully!",
        severity: "success"
      });
    } catch (error) {
      console.error("Failed to delete job:", error);
      setToast({
        open: true,
        message: "Failed to delete job",
        severity: "error"
      });
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      {/* Page Header */}
      <Box className="mb-8 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <Box className="flex items-center gap-4">
          <WorkIcon className="text-blue-600 text-4xl" />
          <Typography variant="h4" component="h1" className="font-bold text-gray-800">
            Job Listings
          </Typography>
        </Box>
        <Link href="/jobs/new" className="no-underline">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="rounded-full px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Post New Job
          </Button>
        </Link>
      </Box>

      {/* Filters */}
      <Paper elevation={2} className="p-6 mb-8 rounded-xl">
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TextField
            label="Search by Title"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="bg-white"
          />
          <FormControl size="small"  fullWidth>
            <InputLabel>Filter by Location</InputLabel>
            <Select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-white"
            >
              <MenuItem value="">All Locations</MenuItem>
              {allLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Salary"
            variant="outlined"
            size="small"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="bg-white"
          />
          <TextField
            label="Max Salary"
            variant="outlined"
            size="small"
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="bg-white"
          />
        </Box>
        <Box className="mt-4 flex justify-end">
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Search Jobs
          </Button>
        </Box>
      </Paper>

      {/* Job Table */}
      <Paper elevation={3} className="rounded-xl overflow-hidden">
        {loading && <LinearProgress />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-blue-600">
                <TableCell className="text-white font-bold">ID</TableCell>
                <TableCell className="text-white font-bold">Title</TableCell>
                <TableCell className="text-white font-bold">Location</TableCell>
                <TableCell className="text-white font-bold">Salary</TableCell>
                <TableCell className="text-white font-bold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow 
                  key={job.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell>{job.id}</TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<LocationIcon />}
                      label={job.location}
                      size="small"
                      className="bg-blue-50"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<SalaryIcon />}
                      label={`$${job.salary}`}
                      color="primary"
                      size="small"
                      className="bg-green-50 text-green-700"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      endIcon={<MoreVertIcon />}
                      onClick={(e) => handleActionsClick(e, job.id)}
                      className="text-gray-700"
                    >
                      Actions
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleActionsClose}
          className="mt-2"
        >
          <Link 
            href={`/jobs/${selectedJobId}`}
            className="no-underline text-gray-700"
          >
            <MenuItem className="px-4 py-2">
              <VisibilityIcon className="mr-2 text-blue-600" />
              View Details
            </MenuItem>
          </Link>
          <Link 
            href={`/jobs/edit/${selectedJobId}`}
            className="no-underline text-gray-700"
          >
            <MenuItem className="px-4 py-2">
              <EditIcon className="mr-2 text-amber-600" />
              Edit Job
            </MenuItem>
          </Link>
          <MenuItem 
            onClick={() => handleDeleteClick(jobs.find(job => job.id === selectedJobId))}
            className="px-4 py-2 text-red-600"
          >
            <DeleteIcon className="mr-2" />
            Delete Job
          </MenuItem>
        </Menu>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        className="rounded-lg"
      >
        <DialogTitle className="bg-red-50 text-red-800">
          Confirm Delete
        </DialogTitle>
        <DialogContent className="mt-4">
          <DialogContentText>
            Are you sure you want to delete this job posting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={handleCancel}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            color="error"
            className="bg-red-600 hover:bg-red-700"
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