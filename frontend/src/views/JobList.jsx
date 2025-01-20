import React, { useEffect, useState,useCallback } from 'react';
import { getJobs, deleteJob, getPaginatedJobs } from '../services/jobService';
import Header from '../components/Header';
import SortButtons from '../components/SortButtons';
import JobTable from '../components/JobTable';
import PaginationComponent from '../components/PaginationComponent';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('title,asc');
  const [isFetchingAll, setIsFetchingAll] = useState(false);
  const size=5;

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
  const loadPaginatedJobs = useCallback( async () => {
    try {
      const response = await getPaginatedJobs(page, size, sort);
      setJobs(response.data.content); // Set paginated job data
      setTotalPages(response.data.totalPages); // Set total pages for pagination
    } catch (error) {
      console.error('Failed to fetch paginated jobs:', error);
    }
  }, [page, size,sort]);

  useEffect(() => {
    if (isFetchingAll) {

      loadAllJobs(); // Fetch all jobs when toggled
    } else {
      loadPaginatedJobs(); // Fetch paginated jobs
    }
  }, [isFetchingAll,loadPaginatedJobs, page, size, sort]);

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
        setSort(newSort); // Highlight the active sort
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
      <div className="p-4 md:p-6 w-full max-w-5xl">
        <Header
          isFetchingAll={isFetchingAll}
          toggleFetchMode={toggleFetchMode}
        />
        {!isFetchingAll && (
          <SortButtons sort={sort} handleSortChange={handleSortChange} />
        )}
        <JobTable jobs={jobs} handleDelete={handleDelete} />
        {!isFetchingAll && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={page}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
