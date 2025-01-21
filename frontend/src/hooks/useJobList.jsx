import { useState, useEffect, useCallback } from 'react';
import { getJobs, getPaginatedJobs, deleteJob } from '../services/jobService';

const useJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('title,asc');
  const [isFetchingAll, setIsFetchingAll] = useState(false);
  const [activeSort, setActiveSort] = useState('title,asc'); // Highlight active sort
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const size = 5;

  
  // Fetch all jobs
  const loadAllJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
      setTotalPages(1); // Disable pagination
    } catch (error) {
      console.error('Failed to fetch all jobs:', error);
    }
  };

  // Fetch paginated jobs
  const loadPaginatedJobs = useCallback(async () => {
    try {
      const response = await getPaginatedJobs(page, size, sort);
      setJobs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch paginated jobs:', error);
    }
  }, [page, size, sort]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value - 1); // Adjust for zero-based indexing
  };

  // Toggle fetch mode
  const toggleFetchMode = () => {
    setIsFetchingAll((prev) => !prev);
  };

  // Handle sorting toggle
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setActiveSort(newSort);
    setPage(0); // Reset to the first page
    setIsFetchingAll(false); // Ensure pagination mode is active
  };

  // Handle the opening of the confirmation popup 
  const openDeleteModal = (jobId) => {
    setSelectedJobId(jobId);
    setIsDeleteModalOpen(true);
  };
  // Handle the closing of the confirmation popup 
  const closeDeleteModal = () => {
    setSelectedJobId(null);
    setIsDeleteModalOpen(false);
  };
  

  // Handle job deletion
  const handleDeleteConfirm = async () => {
    try {
      // Call your deleteJob API here
      await deleteJob(selectedJobId);
      setJobs(jobs.filter((job) => job.id !== selectedJobId)); // Update the job list
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  

  useEffect(() => {
    if (isFetchingAll) {
      loadAllJobs();
    } else {
      loadPaginatedJobs();
    }
  }, [isFetchingAll, loadPaginatedJobs]);

  return {
    jobs,
    totalPages,
    page,
    sort,
    activeSort,
    isFetchingAll,
    handlePageChange,
    toggleFetchMode,
    handleSortChange,
    isDeleteModalOpen,
    handleDeleteConfirm,
    openDeleteModal,
    closeDeleteModal
  };
};

export default useJobList;
