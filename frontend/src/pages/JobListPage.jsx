import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import JobTable from '../components/JobTable/JobTable'; // Votre tableau de jobs
import JobForm from '../components/JobForm/JobForm'; // Votre formulaire existant
import { fetchJobs, createJob, updateJob, deleteJob } from '../api/jobsApi';
import './pages.css';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await fetchJobs();
      setJobs(response.data); // Mettez à jour la liste des jobs
    } catch (error) {
      console.error('Erreur lors du chargement des jobs:', error);
    }
  };
  // Ouvrir le modal
  const handleOpenModal = (job = null) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSaveJob = async (job) => {
    try {
      if (selectedJob) {
        // Modification d'un job existant
        const response = await updateJob(selectedJob.id, job);
        const updatedJob = response.data;
  
        setJobs((prevJobs) =>
          prevJobs.map((j) => (j.id === selectedJob.id ? updatedJob : j))
        );
      } else {
        // Ajout d'un nouveau job
        const response = await createJob(job);
        const newJob = response.data;
  
        setJobs((prevJobs) => [...prevJobs, newJob]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du job:', error);
    }
  };
  
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du job:', error);
    }
  };

  return (
    <div className="job-list-page">
      <div className="box">
        <Button className="btn btn-add" onClick={() => handleOpenModal()}>
          New Job +
        </Button>
        <h2>Job List</h2>
      </div>

      {/* Table des jobs */}
      <JobTable jobs={jobs} onEdit={(job) => handleOpenModal(job)} onDelete={handleDeleteJob} />

      {/* Modal MUI */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth={false}
        maxWidth="lg"
        PaperProps={{
          style: {
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <DialogContent>
          <JobForm
            onSubmit={handleSaveJob}
            initialData={selectedJob || {}}
            isEditing={!!selectedJob}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} className="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobListPage;
