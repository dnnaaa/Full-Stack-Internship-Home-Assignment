'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const JobTable = ({ jobs }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/edit-job/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${id}`);
      router.refresh();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
      <tr>
        <th width="10%" className="px-4 font-normal py-2 border border-black">ID</th>
        <th width="45%" className="px-4 font-normal py-2 border border-black">Title</th>
        <th width="20%" className="px-4 font-normal py-2 border border-black">Location</th>
        <th width="15%" className="px-4 font-normal py-2 border border-black">Salary</th>
        <th width="10%" className="px-4 font-normal py-2 border border-black">Actions</th>
      </tr>
      </thead>
      <tbody>
      {jobs.map((job) => (
        <tr key={job.id}>
          <td width="10%" className="px-4 py-2 border border-black text-center">{job.id}</td>
          <td width="45%" className="px-4 py-2 border border-black">{job.title}</td>
          <td width="15%" className="px-4 py-2 border border-black text-center">{job.location}</td>
          <td width="15%" className="px-4 py-2 border border-black text-center">$ {job.salary}</td>
          <td className="px-3 py-2 border-b border-r border-black flex flex-col">
            <button
              className="bg-blue-100 text-blue-500 border border-blue-500 py-0 px-7 rounded mb-3 "
              onClick={() => handleEdit(job.id)}
            >
              Update
            </button>
            <button
              className="bg-red-100 text-red-500 border border-red-500 py-0 px-7 rounded"
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default JobTable;
