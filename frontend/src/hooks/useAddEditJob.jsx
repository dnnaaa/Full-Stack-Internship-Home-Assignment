import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, createJob, updateJob } from '../services/jobService';

/**
 * Custom hook to manage state and logic for adding and editing a job.
 * Provides functionality for input validation, form submission, modal handling, and navigation.
 */
const useAddEditJob = () => {
  // State variables for job data and error handling
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' }); // Job details
  const [errors, setErrors] = useState({}); // Validation errors
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // State to control success modal visibility
  const [successMessage, setSuccessMessage] = useState(''); // Message displayed in the success modal

  // React Router hooks for navigation and retrieving job ID from the URL
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const jobId = idParam ? parseInt(idParam, 10) : undefined; // Parse job ID from URL if present

  /**
   * Fetches job data if editing an existing job (jobId is present).
   * Executes on component mount or when jobId changes.
   */
  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await getJobById(jobId);
          setJob(response.data); // Populate job state with fetched data
        } catch (error) {
          console.error('Failed to fetch job:', error); // Handle fetch errors
        }
      };
      fetchJob();
    }
  }, [jobId]);

  /**
   * Validates the job form inputs.
   * Ensures required fields are populated and salary is non-negative.
   *
   * @returns {Object} An object containing validation errors (if any).
   */
  const validate = () => {
    let errors = {};
    if (!job.title) errors.title = 'Title is required.';
    if (!job.description) errors.description = 'Description is required.';
    if (job.salary < 0 || !job.salary) errors.salary = 'Salary is required and cannot be negative.';
    return errors;
  };

  /**
   * Handles form submission for adding or editing a job.
   * Performs validation, sends API requests, and displays success modal.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set validation errors if any
      return;
    }
    try {
      if (jobId) {
        await updateJob(jobId, job); // Update existing job
        setSuccessMessage('Job updated successfully!');
      } else {
        await createJob(job); // Create a new job
        setSuccessMessage('Job added successfully!');
      }
      setOpenSuccessModal(true); // Show success modal
    } catch (error) {
      console.error('Failed to save job:', error); // Handle API errors
    }
  };

  /**
   * Handles input changes in the form fields.
   * Updates job state and clears corresponding validation errors.
   *
   * @param {string} field - The field being updated.
   * @returns {Function} A function to handle the input change event.
   */
  const handleInputChange = (field) => (e) => {
    setJob({ ...job, [field]: e.target.value }); // Update job field
    setErrors((prevErrors) => {
      if (prevErrors[field]) {
        const newErrors = { ...prevErrors };
        delete newErrors[field]; // Clear the error for the updated field
        return newErrors;
      }
      return prevErrors;
    });
  };

  /**
   * Closes the success modal and redirects the user to the job list page.
   */
  const handleModalClose = () => {
    setOpenSuccessModal(false); // Close the modal
    navigate('/'); // Redirect to the job list
  };

  /**
   * Navigates back to the job list page without making any changes.
   */
  const handleBack = () => {
    navigate('/'); // Redirect to the job list
  };

  // Return the state variables and handler functions for use in the component
  return {
    job,
    errors,
    jobId,
    handleSubmit,
    handleInputChange,
    handleBack,
    openSuccessModal,
    successMessage,
    handleModalClose,
  };
};

export default useAddEditJob;
