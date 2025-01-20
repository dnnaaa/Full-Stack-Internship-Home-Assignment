package ma.dnaengineering.backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import ma.dnaengineering.backend.bo.Job;
import ma.dnaengineering.backend.dao.IJobRepositry;
import ma.dnaengineering.backend.service.IjobService;


@Service
@Transactional
public class JobService implements IjobService {
	
	@Autowired
	IJobRepositry jobrepo;
	
	@Override
	public void addJob(Job job) {
		// TODO Auto-generated method stub
		jobrepo.save(job);
		
	}

	@Override
	public void deleteJob(Long Id) {
		// TODO Auto-generated method stub
		jobrepo.deleteById(Id);
	}

	@Override
	public Optional<Job> getJobById(Long id) {
		// TODO Auto-generated method stub
		
		return jobrepo.findById(id);
	}

	@Override
	public List<Job> getAllJobs() {
		// TODO Auto-generated method stub
		return jobrepo.findAll();
	}

	@Override
	public void updateJob(Long id, Job updatedJobDetails) {
	    // Récupérer le job existant par son ID
	    Optional<Job> jobOptional = jobrepo.findById(id);
	    
	    if (jobOptional.isPresent()) {
	        // Mise à jour des champs du job
	        Job existingJob = jobOptional.get();
	        existingJob.setTitle(updatedJobDetails.getTitle());
	        existingJob.setDescription(updatedJobDetails.getDescription());
	        // Ajoutez ici d'autres champs à mettre à jour

	        // Sauvegarder le job mis à jour dans le repository
	        jobrepo.save(existingJob);
	    } else {
	        // Gérer le cas où le job n'existe pas
	        throw new EntityNotFoundException("Job not found with id " + id);
	    }
	}


}
