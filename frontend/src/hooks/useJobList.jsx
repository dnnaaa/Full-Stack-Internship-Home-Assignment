import { useState, useEffect, useCallback } from 'react';
import { getJobs, getPaginatedJobs, deleteJob } from '../services/jobService';

/**
 * Custom hook to manage job list state and operations.
 * Provides functionalities for fetching, paginating, sorting, and deleting jobs.
 */
const useJobList = () => {
  // State variables for job list and related features
  const [jobs, setJobs] = useState([]); // Stores the list of jobs
  const [page, setPage] = useState(0); // Tracks the current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages available
  const [sort, setSort] = useState('title,asc'); // Current sorting criteria
  const [isFetchingAll, setIsFetchingAll] = useState(false); // Toggle between fetching all jobs or paginated jobs
  const [activeSort, setActiveSort] = useState('title,asc'); // Tracks the active sorting state for UI highlighting
  const [selectedJobId, setSelectedJobId] = useState(null); // Tracks the job ID selected for deletion
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Controls the visibility of the delete confirmation modal
  const size = 5; // Number of jobs per page for pagination

  /**
   * Fetch all jobs from the backend.
   * Updates the job list and disables pagination.
   */
  const loadAllJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data); // Update the job list
      setTotalPages(1); // Disable pagination when fetching all jobs
    } catch (error) {
      console.error('Failed to fetch all jobs:', error);
    }
  };

  /**
   * Fetch paginated jobs based on the current page, size, and sorting criteria.
   */
  const loadPaginatedJobs = useCallback(async () => {
    try {
      const response = await getPaginatedJobs(page, size, sort);
      setJobs(response.data.content); // Update the job list
      setTotalPages(response.data.totalPages); // Update the total number of pages
    } catch (error) {
      console.error('Failed to fetch paginated jobs:', error);
    }
  }, [page, size, sort]);

  /**
   * Handle page changes in the pagination component.
   * Updates the current page state.
   *
   * @param {object} event - The event triggered by the pagination component.
   * @param {number} value - The new page number.
   */
  const handlePageChange = (event, value) => {
    setPage(value - 1); // Adjust for zero-based indexing
  };

  /**
   * Toggle between fetching all jobs or paginated jobs.
   */
  const toggleFetchMode = () => {
    setIsFetchingAll((prev) => !prev);
  };

  /**
   * Handle sorting changes for the job list.
   * Updates the sorting state and resets the pagination to the first page.
   *
   * @param {string} newSort - The new sorting criteria (e.g., 'title,asc').
   */
  const handleSortChange = (newSort) => {
    setSort(newSort); // Update sorting criteria
    setActiveSort(newSort); // Highlight the active sort option in the UI
    setPage(0); // Reset to the first page
    setIsFetchingAll(false); // Ensure pagination mode is active
  };

  /**
   * Open the delete confirmation modal for a specific job.
   *
   * @param {number} jobId - The ID of the job to delete.
   */
  const openDeleteModal = (jobId) => {
    setSelectedJobId(jobId); // Set the job ID for deletion
    setIsDeleteModalOpen(true); // Show the delete confirmation modal
  };

  /**
   * Close the delete confirmation modal.
   */
  const closeDeleteModal = () => {
    setSelectedJobId(null); // Clear the selected job ID
    setIsDeleteModalOpen(false); // Hide the delete confirmation modal
  };

  /**
   * Confirm deletion of a job.
   * Calls the delete API and updates the job list.
   */
  const handleDeleteConfirm = async () => {
    try {
      await deleteJob(selectedJobId); // Call the delete API
      setJobs(jobs.filter((job) => job.id !== selectedJobId)); // Remove the deleted job from the list
      closeDeleteModal(); // Close the modal
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  /**
   * Effect to load jobs based on the current fetch mode (all or paginated).
   */
  useEffect(() => {
    if (isFetchingAll) {
      loadAllJobs();
    } else {
      loadPaginatedJobs();
    }
  }, [isFetchingAll, loadPaginatedJobs]);

  // Return the state and handlers to be used in components
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
    closeDeleteModal,
  };
};

export default useJobList;