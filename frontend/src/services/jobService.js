import axios from 'axios';

// Base API URL for job-related endpoints
const API_URL = 'http://localhost:8484/api/jobs';

/**
 * Fetch all jobs from the backend.
 * This method retrieves the complete list of jobs without pagination or sorting.
 *
 * @returns {Promise} A promise that resolves to the response containing all jobs.
 */
export const getJobs = () => {
  return axios.get(`${API_URL}/All`);
};

/**
 * Fetch paginated and sorted jobs from the backend.
 * This method allows the client to specify pagination and sorting parameters.
 *
 * @param {number} page - The current page number (zero-based index).
 * @param {number} size - The number of jobs per page.
 * @param {string} sort - The sorting criteria (e.g., 'title,asc' or 'salary,desc').
 * @returns {Promise} A promise that resolves to the paginated and sorted job data.
 */
export const getPaginatedJobs = async (page, size, sort) => {
  return axios.get(`${API_URL}`, {
    params: { page, size, sort }, // Query parameters for pagination and sorting
  });
};

/**
 * Fetch a specific job by its ID.
 * This method retrieves job details for a single job based on the provided ID.
 *
 * @param {number} id - The ID of the job to fetch.
 * @returns {Promise} A promise that resolves to the job data.
 */
export const getJobById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

/**
 * Create a new job.
 * Sends a POST request with the job data to the backend to create a new job.
 *
 * @param {object} job - The job data to be created.
 * @returns {Promise} A promise that resolves to the created job data.
 */
export const createJob = (job) => {
  return axios.post(API_URL, job);
};

/**
 * Update an existing job.
 * Sends a PUT request with the updated job data to modify an existing job.
 *
 * @param {number} id - The ID of the job to update.
 * @param {object} job - The updated job data.
 * @returns {Promise} A promise that resolves to the updated job data.
 */
export const updateJob = (id, job) => {
  return axios.put(`${API_URL}/${id}`, job);
};

/**
 * Delete a job by its ID.
 * Sends a DELETE request to remove a specific job from the backend.
 *
 * @param {number} id - The ID of the job to delete.
 * @returns {Promise} A promise that resolves when the job is deleted.
 */
export const deleteJob = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
