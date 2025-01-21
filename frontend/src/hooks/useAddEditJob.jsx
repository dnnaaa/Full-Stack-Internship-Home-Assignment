import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, createJob, updateJob } from '../services/jobService';

const useAddEditJob = () => {
    const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
    const [errors, setErrors] = useState({});
    const [openSuccessModal, setOpenSuccessModal] = useState(false); // Modal state
    const [successMessage, setSuccessMessage] = useState(''); // Message for modal
    const { id: idParam } = useParams();
    const navigate = useNavigate();
    const jobId = idParam ? parseInt(idParam, 10) : undefined;

  
  useEffect(() => {
      if (jobId) {
        const fetchJob = async () => {
          try {
            const response = await getJobById(jobId);
            setJob(response.data);
          } catch (error) {
            console.error('Failed to fetch job:', error);
          }
        };
        fetchJob();
      }
    }, [jobId]);
  
    const validate = () => {
      let errors = {};
      if (!job.title) errors.title = 'Title is required.';
      if (!job.description) errors.description = 'Description is required.';
      if (job.salary < 0 || !job.salary) errors.salary = 'Salary is required and cannot be negative.';
      return errors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      try {
        if (jobId) {
          await updateJob(jobId, job);
          setSuccessMessage('Job updated successfully!');
        } else {
          await createJob(job);
          setSuccessMessage('Job added successfully!');
        }
        setOpenSuccessModal(true);
      } catch (error) {
        console.error('Failed to save job:', error);
      }
    };
  
    const handleInputChange = (field) => (e) => {
      setJob({ ...job, [field]: e.target.value });
      setErrors((prevErrors) => {
        if (prevErrors[field]) {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        }
        return prevErrors;
      });
    };

    const handleModalClose = () => {
        setOpenSuccessModal(false); // Close the modal
        navigate('/'); // Redirect to the job list
      };
  
    const handleBack = () => {
      navigate('/');
    };

  return {
    job,
    errors,
    jobId,
    handleSubmit,
    handleInputChange,
    handleBack,
    openSuccessModal,
    successMessage,
    handleModalClose
  };
};

export default useAddEditJob;
