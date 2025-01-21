'use client';

import React, { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import { DeleteConfirmationDialog } from '../components/Deletewindow';
import { JobService } from '../services/jobService';
import { PlusCircle, Pencil, Trash2, Loader2 } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    jobId: null,
    jobTitle: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await JobService.fetchJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = () => {
    setEditJob(null);
    setFormOpen(true);
  };

  const handleEditJob = (job) => {
    setEditJob(job);
    setFormOpen(true);
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    setLoading(true);
    try {
      await JobService.deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editJob) {
        const response = await JobService.updateJob(editJob.id, formData);
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === response.data.id ? response.data : job
          )
        );
      } else {
        const response = await JobService.createJob(formData);
        setJobs((prevJobs) => [...prevJobs, response.data]);
      }
    } catch (error) {
      console.error('Failed to submit job:', error);
    } finally {
      setLoading(false);
      setFormOpen(false);
    }
  };

  const handleDeleteClick = (job) => {
    setDeleteDialog({
      isOpen: true,
      jobId: job.id,
      jobTitle: job.title,
    });
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await JobService.deleteJob(deleteDialog.jobId);
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== deleteDialog.jobId)
      );
      setDeleteDialog({ isOpen: false, jobId: null, jobTitle: '' });
    } catch (error) {
      console.error('Failed to delete job:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, jobId: null, jobTitle: '' });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Job Management
          </h1>
          <button
            onClick={handleAddJob}
            disabled={loading}
            className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50'>
            <PlusCircle className='w-5 h-5 mr-2' />
            Add New Job
          </button>
        </div>

        {/* Table Section */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
              <tr className='border-b border-gray-200'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Title
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Description
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Location
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Salary
                </th>
                <th className='px-6 py-4 text-right text-sm font-semibold text-gray-600'>
                  Actions
                </th>
              </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
              {loading && !deleteDialog.isOpen ? (
                <tr>
                  <td colSpan='5' className='px-6 py-8 text-center'>
                    <Loader2 className='w-6 h-6 animate-spin mx-auto text-blue-600' />
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan='5'
                    className='px-6 py-8 text-center text-gray-500'>
                    No jobs found. Click "Add New Job" to create one.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className='hover:bg-gray-50 transition-colors duration-150'>
                    <td className='px-6 py-4 text-sm text-gray-900 font-medium'>
                      {job.title}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>
                      {job.description.length > 100
                        ? `${job.description.substring(0, 100)}...`
                        : job.description}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>
                      {job.location}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>
                      $
                      {typeof job.salary === 'number'
                        ? job.salary.toLocaleString()
                        : job.salary}
                    </td>
                    <td className='px-6 py-4 text-right space-x-2'>
                      <button
                        onClick={() => handleEditJob(job)}
                        disabled={loading}
                        className='inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150'>
                        <Pencil className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(job)}
                        disabled={loading}
                        className='inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150'>
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>

        <JobForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editJob}
          loading={loading}
        />

        <DeleteConfirmationDialog
          isOpen={deleteDialog.isOpen}
          onClose={closeDeleteDialog}
          onConfirm={handleDeleteConfirm}
          jobTitle={deleteDialog.jobTitle}
          loading={loading}
        />
      </div>
    </div>
  );
}
