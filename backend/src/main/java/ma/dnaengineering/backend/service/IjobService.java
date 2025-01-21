package ma.dnaengineering.backend.service;

import java.util.List;
import java.util.Optional;

import ma.dnaengineering.backend.bo.Job;

public interface IjobService {

	public void addJob(Job job);
	public void deleteJob(Long Id);
	public Optional<Job> getJobById(Long id);
	
	public List<Job> getAllJobs();
	
	public void updateJob(Long Id,Job updatedJobDetails);
	
	
	
}
