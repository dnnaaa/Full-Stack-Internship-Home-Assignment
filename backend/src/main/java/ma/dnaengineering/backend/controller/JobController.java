package ma.dnaengineering.backend.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.service.JobService;
@RestController
@CrossOrigin("http://localhost:3000")
public class JobController {
	@Autowired JobService js;
	@GetMapping("job")
	public List<Job>getAllJobs(){
		return js.getAllJobs();	
	}
	@PostMapping("/job")
	public Job AddJob(@RequestBody Job job) {
	    return js.AddJob(job); 
	}

	@GetMapping("job/{id}")
	public Optional <Job> getJobById(@PathVariable Long id) {
		return js.getJobById(id);	
	}
	@DeleteMapping("job/{id}")
	public void deleteJobById(@PathVariable Long id) {
		js.deleteJobById(id);
}
	@PutMapping("job/{id}")
	public Job updateJob(@RequestBody Job s) {
		return js.updateJob(s);
		
	}
	
}