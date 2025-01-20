import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob,getPaginatedJobs } from '../services/jobService';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public'; 
import WorkIcon from '@mui/icons-material/Work';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Pagination from '@mui/material/Pagination';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0); // Current page (zero-based index)
  const [size, setSize] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages from backend
  const [sort, setSort] = useState('title,asc'); // Default sorting
  const [isFetchingAll, setIsFetchingAll] = useState(false); // Toggle state of fetching methode
  const [activeSort, setActiveSort] = useState('title,asc'); // Track the current active sort
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetchingAll) {
      loadAllJobs(); // Fetch all jobs when toggled
    } else {
      loadPaginatedJobs(); // Fetch paginated jobs
    }
  }, [isFetchingAll, page, size, sort]);

  // Fetch all jobs without pagination
  const loadAllJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data); // Set all job data
      setTotalPages(1); // Disable pagination
    } catch (error) {
      console.error('Failed to fetch all jobs:', error);
    }
  };

  // Fetch paginated jobs
  const loadPaginatedJobs = async () => {
    try {
      const response = await getPaginatedJobs(page, size, sort);
      setJobs(response.data.content); // Set paginated job data
      setTotalPages(response.data.totalPages); // Set total pages for pagination
    } catch (error) {
      console.error('Failed to fetch paginated jobs:', error);
    }
  };
  
    const handlePageChange = (event, value) => {
      setPage(value - 1); // Adjust for zero-based indexing
    };
    // Toggle fetch method
    const toggleFetchMode = () => {
        setIsFetchingAll((prev) => !prev); // Toggle between fetching all and paginated
    };
  
    // Handle sorting toggle
    const handleSortChange = (newSort) => {
        setSort(newSort); // Update sorting field and direction
        setActiveSort(newSort); // Highlight the active sort
        setPage(0); // Reset to the first page
        setIsFetchingAll(false); // Ensure pagination mode is active
    };

    const handleDelete = async (id) => {
        try {
        await deleteJob(id);
        if (isFetchingAll) {
            loadAllJobs(); // Fetch all jobs when toggled
        } else {
            loadPaginatedJobs(); // Fetch paginated jobs
        }
        } catch (error) {
        console.error('Failed to delete job:', error);
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">
      <div className="p-4 md:p-6 w-full max-w-5xl ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-300">
            Job Management
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleFetchMode}
            className="mb-4"
            sx={{ borderRadius: '50px' }}
            
          >
            {isFetchingAll ? 'Jobs by Pages' : 'All Jobs'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/add-job')}
            startIcon={<AddIcon />}
            sx={{ borderRadius: '50px' }}
          >
            Add Job
          </Button>
        </div>
        {/* Sorting Options */}
        {!isFetchingAll && (
            <div className="mb-4 flex flex-wrap gap-2">
            <Button
                variant={activeSort === 'title,asc' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSortChange('title,asc')}
            >
                Title ASC
            </Button>
            <Button
                variant={activeSort === 'title,desc' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSortChange('title,desc')}
            >
                Title DESC
            </Button>
            <Button
                variant={activeSort === 'salary,asc' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSortChange('salary,asc')}
            >
                Salary ASC
            </Button>
            <Button
                variant={activeSort === 'salary,desc' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSortChange('salary,desc')}
            >
                Salary DESC
            </Button>
            </div>
        )}

        <TableContainer component={Paper} className="shadow-lg bg-gray-800overflow-hidden" sx={{ borderRadius: '25px' }}>
          <Table className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                    <UnfoldMoreIcon fontSize="small" />
                    Title
                  </div>
                </TableCell>
                <TableCell className="text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                      <UnfoldMoreIcon fontSize="small" />
                      Location
                  </div>
                </TableCell>
                <TableCell className="text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                      <UnfoldMoreIcon fontSize="small" />
                      Salary
                  </div> 
                </TableCell>
                <TableCell className="text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                      <UnfoldMoreIcon fontSize="small" />
                      Actions
                  </div> 
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-700 text-gray-300"
                >
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <WorkIcon fontSize="small" />
                      {job.title}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <PublicIcon fontSize="small" />
                      {job.location}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <AttachMoneyIcon fontSize="small" />
                      {job.salary}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => navigate(`/edit-job/${job.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(job.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination Component */}
      {!isFetchingAll && (
        <Pagination
          count={totalPages}
          page={page + 1} // Adjust for zero-based indexing
          onChange={handlePageChange}
          className="mt-4"
          color="primary"
        />
      )}
      </div>
    </div>
  );
};

export default JobList;
