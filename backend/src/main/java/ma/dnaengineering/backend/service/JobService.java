package ma.dnaengineering.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;

@Service
public class JobService {
	
	@Autowired JobRepository  jobRepository;
	
	public List<Job> getAllJobs() {
		return jobRepository.findAll();
	}
	
	public Job addJob(Job job){
		return jobRepository.save(job);
	}
	
	public Optional<Job> getJobById(Long id) {
		return jobRepository.findById(id);
	}
    

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
    

  
    public Job updateJob(Long id, Job updatedJobData) throws IOException {
        // Chercher le job existant
        Optional<Job> existingJobOptional = jobRepository.findById(id);

        if (existingJobOptional.isPresent()) {
            Job existingJob = existingJobOptional.get();

            // Mettre à jour uniquement les champs modifiés
            if (updatedJobData.getTitle() != null) {
                existingJob.setTitle(updatedJobData.getTitle());
            }
            if (updatedJobData.getLocation() != null) {
                existingJob.setLocation(updatedJobData.getLocation());
            }
            if (updatedJobData.getDescription() != null) {
                existingJob.setDescription(updatedJobData.getDescription());
            }
            if (updatedJobData.getSalary()!= 0) {
                existingJob.setSalary(updatedJobData.getSalary());
            }

            // Enregistrer les modifications dans le repository
            return jobRepository.save(existingJob);
        }

        // Si le job avec l'ID donné n'existe pas
        throw new IOException("Job with ID " + id + " not found.");
    }

	
	

}
