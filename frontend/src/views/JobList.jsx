import React from 'react';
import useJobList from '../hooks/useJobList';
import Header from '../components/Header';
import SortButtons from '../components/SortButtons';
import JobTable from '../components/JobTable';
import PaginationComponent from '../components/PaginationComponent';
import ConfirmationModal from '../components/Modal/ConfirmationModal';


const JobList = () => {
  const {
    jobs,
    totalPages,
    page,
    sort,
    isFetchingAll,
    handlePageChange,
    toggleFetchMode,
    handleSortChange,
    isDeleteModalOpen,
    handleDeleteConfirm,
    openDeleteModal,
    closeDeleteModal,
  } = useJobList();


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950 text-gray-300">
      <div className="p-4 md:p-6 w-full max-w-5xl">
        <Header isFetchingAll={isFetchingAll} toggleFetchMode={toggleFetchMode} />
        <ConfirmationModal
            open={isDeleteModalOpen}
            title="Delete Job"
            message="Are you sure you want to delete this job?"
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteModal}
        />
        {!isFetchingAll && <SortButtons sort={sort} handleSortChange={handleSortChange} />}
        <JobTable jobs={jobs} handleDelete={openDeleteModal} />
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
