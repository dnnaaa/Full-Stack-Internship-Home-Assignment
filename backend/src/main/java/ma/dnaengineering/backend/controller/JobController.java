package ma.dnaengineering.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.JobService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class JobController {
  
	@Autowired JobService jobService;
	
	
	@GetMapping("/jobs")
	public List<Job> getAllJobs() {
		return jobService.getAllJobs();
	}
	
	@PostMapping("/jobs")
	public Job addJob(@RequestBody  Job job){	
		return jobService.addJob(job);
	}
	
	
	@GetMapping("/jobs/{id}")
	public Job getJobById(@PathVariable Long id ) {
		
		return jobService.getJobById(id).get();
	}
	
	@PutMapping("/jobs/{id}")
	public Job updateJob(@PathVariable Long id, @RequestBody Job job) throws IOException {
	    return jobService.updateJob(id, job);
	}
	
	
	@DeleteMapping("/jobs/{id}")
	public void deleteJob(@PathVariable Long id ) {
		 jobService.deleteJob(id);
	}
	
}
