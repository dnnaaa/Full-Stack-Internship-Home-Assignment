package ma.dnaengineering.backend.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repository.JobRepository;
@Service
public class JobService {
	@Autowired JobRepository jr;
	List<Job>jobs=new ArrayList<>();
	public List<Job> getAllJobs() {
		return jr.findAll();
	}

	public Optional<Job> getJobById(Long id) {
		return jr.findById(id);
	}

	public void deleteJobById(Long id) {
		jr.deleteById(id);
		
	}
	public Job AddJob(Job j ) {
		return jr.save(j);
	}

	public Job updateJob(Job s) {
		return jr.save(s);
	}
	
}