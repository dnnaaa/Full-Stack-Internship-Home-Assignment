import React from 'react';
import useJobList from '../hooks/useJobList'; // Custom hook to manage job list state and logic
import Header from '../components/Header'; // Header component with toggle functionality
import SortButtons from '../components/SortButtons'; // Component for sorting options
import JobTable from '../components/JobTable'; // Component for displaying the job table
import PaginationComponent from '../components/PaginationComponent'; // Component for pagination
import ConfirmationModal from '../components/Modal/ConfirmationModal'; // Modal for delete confirmation
import TableEmpty from '../components/TableEmpty'; // Component for the table if its empty

/**
 * JobList component for displaying a list of jobs.
 * Includes features for sorting, pagination, and job deletion with confirmation.
 */
const JobList = () => {
  // Destructure state and handlers from the custom hook
  const {
    jobs, // List of jobs to display
    totalPages, // Total number of pages for pagination
    page, // Current page
    sort, // Current sorting criteria
    isFetchingAll, // State to toggle between fetching all jobs or paginated jobs
    handlePageChange, // Function to handle pagination changes
    toggleFetchMode, // Function to toggle between fetch modes
    handleSortChange, // Function to handle sorting changes
    isDeleteModalOpen, // State to control delete confirmation modal visibility
    handleDeleteConfirm, // Function to confirm job deletion
    openDeleteModal, // Function to open the delete confirmation modal
    closeDeleteModal, // Function to close the delete confirmation modal
  } = useJobList();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950 text-gray-300">
      <div className="p-4 md:p-6 w-full max-w-5xl">
        {/* Header with toggle button for fetch mode */}
        <Header
          isFetchingAll={isFetchingAll}
          toggleFetchMode={toggleFetchMode}
        />

        {/* Delete confirmation modal */}
        <ConfirmationModal
          open={isDeleteModalOpen} // Control modal visibility
          title="Delete Job" // Modal title
          message="Are you sure you want to delete this job?" // Modal message
          onConfirm={handleDeleteConfirm} // Confirm action
          onCancel={closeDeleteModal} // Cancel action
        />

        {/* Sorting buttons (visible only in paginated mode) */}
        {!isFetchingAll && (
          <SortButtons
            sort={sort}
            handleSortChange={handleSortChange}
          />
        )}

        {/* Job table displaying the list of jobs if the list is empty show a message */}
        <JobTable
          jobs={jobs}
          handleDelete={openDeleteModal} // Pass the delete handler
        />
        {jobs.length === 0 && (
          <TableEmpty/>
        )}

        {/* Pagination component (visible only in paginated mode) */}
        {!isFetchingAll && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={page}
            handlePageChange={handlePageChange} // Handle page changes
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
