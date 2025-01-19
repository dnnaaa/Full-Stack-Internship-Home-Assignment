"use client";

import { useState, useEffect } from "react";
import axios from "../utils/axios";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Job
  const handleAddJob = async () => {
    try {
      await axios.post("/jobs", formData);
      toast.success("Job added successfully!");
      setShowAddModal(false);
      fetchJobs();
    } catch (error) {
      toast.error("Failed to add job");
    }
  };

  // Update Job
  const handleUpdateJob = async () => {
    if (!selectedJob) return;
    try {
      await axios.put(`/jobs/${selectedJob.id}`, formData);
      toast.success("Job updated successfully!");
      setShowEditModal(false);
      fetchJobs();
    } catch (error) {
      toast.error("Failed to update job");
    }
  };

  // Delete Job
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Management</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Job
      </button>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="border px-4 py-2">{job.id}</td>
              <td className="border px-4 py-2">{job.title}</td>
              <td className="border px-4 py-2">{job.location}</td>
              <td className="border px-4 py-2">${job.salary}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setFormData(job);
                    setShowEditModal(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Job Modal */}
      {showAddModal && (
        <Modal
          title="Add Job"
          onClose={() => setShowAddModal(false)}
          onSave={handleAddJob}
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {/* Edit Job Modal */}
      {showEditModal && (
        <Modal
          title="Edit Job"
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateJob}
          formData={formData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
