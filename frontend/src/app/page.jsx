"use client";
import React, { useState, useEffect } from "react";
import { getJobs, createJob, deleteJob, updateJob } from "@/pages/api/jobs"; 
import '../styles/globals.css';
import Swal from "sweetalert2";
const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [newJob, setNewJob] = useState({ title: "", location: "", salary: "" });
  const [editJob, setEditJob] = useState(null); // Ajout d'un état pour le job à éditer
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching the jobs.',
        });
      }
    };
  
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const result = await deleteJob(jobId);
      if (result.success) {
        setJobs(jobs.filter((job) => job.id !== jobId)); 
        Swal.fire({
          icon: 'success',
          title: 'Job deleted',
          text: 'The job has been successfully deleted!',
        });
      } else {
        alert(`Error deleting job: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleUpdate = (jobId) => {
    const jobToUpdate = jobs.find((job) => job.id === jobId);
    setEditJob(jobToUpdate); 
    setShowModal(true); 
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.location || !newJob.salary) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all fields!',
      });
      return; 
    }
    if (newJob.salary <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Salary',
        text: 'Salary must be a positive number.',
      });
      return;
    }
    

    try {
      const jobData = {
        ...newJob,
        posted_at: new Date().toISOString(), 
      };
      const result = await createJob(jobData);
      setJobs((prevJobs) => [...prevJobs, result]); 
      setShowModal(false);
      setNewJob({ title: "", location: "", salary: "" });
      console.log(jobData); 


      Swal.fire({
        icon: 'success',
        title: 'Job added',
        text: 'The job has been successfully added!',
      });
    } catch (error) {
      console.error("Error adding job:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the job.',
      });
    }
  };

  const handleSubmitUpdate = async () => {
    if (!editJob.title || !editJob.location || !editJob.salary) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all fields!',
      });
      return; 
    }
    
    try {
      const updatedData = {
        ...editJob,
        updated_at: new Date().toISOString(), 
      }
         
      const result = await updateJob(editJob.id, updatedData);
      setJobs(jobs.map((job) => (job.id === result.id ? result : job))); 
      setShowModal(false);
      setEditJob(null); 
      Swal.fire({
        icon: 'success',
        title: 'Job Updated',
        text: 'The job has been successfully updated!',
      });
    } catch (error) {
      console.error("Error updating job:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the job.',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editJob) {
      setEditJob((prevJob) => ({
        ...prevJob,
        [name]: value,
      }));
    } else {
      setNewJob((prevJob) => ({
        ...prevJob,
        [name]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Job List</h1>
      {/* Bouton pour ouvrir la modale */}
      <button
        onClick={() => { setShowModal(true); setEditJob(null); }} // Afficher la modale pour un nouveau job
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-red-400 ml-[90%] mb-4"
      >
        New Job +
      </button>

    
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{editJob ? 'Edit Job' : 'Add a New Job'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editJob ? editJob.title : newJob.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editJob ? editJob.location : newJob.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={editJob ? editJob.salary : newJob.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editJob ? editJob.description : newJob.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        {!editJob && (
          <div className="mb-4">
            <label htmlFor="posted_at" className="block text-sm font-medium text-gray-700">
              Posted At
            </label>
            <input
              type="datetime-local"
              id="posted_at"
              name="posted_at"
              value={new Date().toISOString().slice(0, 16)} 
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
        )}
        {editJob && (
          <div className="mb-4" style={{display:"none"}}>
            <label htmlFor="updated_at" className="block text-sm font-medium text-gray-700">
              Updated At
            </label>
            <input
              type="datetime-local"
              id="updated_at"
              name="updated_at"
              value={new Date().toISOString().slice(0, 16)} // Date actuelle par défaut lors de la modification
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
        )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)} // Fermer la modale
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editJob ? handleSubmitUpdate : handleAddJob} // Ajouter ou mettre à jour selon le cas
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editJob ? 'Update Job' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-100">ID</th>
            <th className="px-4 py-2 text-left bg-gray-100">Title</th>
            <th className="px-4 py-2 text-left bg-gray-100">Location</th>
            <th className="px-4 py-2 text-left bg-gray-100">Salary</th>
            <th className="px-4 py-2 text-left bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{job.id}</td>
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.location}</td>
                <td className="px-4 py-2">${job.salary}</td>
                <td className="px-4 py-2 space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-200 text-black border-blue-500 border-t-2 rounded hover:bg-orange-400"
                    onClick={() => handleUpdate(job.id)}>
                    Update
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
                    onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">No jobs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
