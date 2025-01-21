package ma.dnaengineering.backend.controller;


import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.service.JobService;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@CrossOrigin(origins="http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private JobService jobService;

    //build add job REST API
    @PostMapping
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobDto) {
        JobDto savedJob = jobService.createJob(jobDto);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }
    //Build Get Job REST API
    @GetMapping("{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Long jobId) {
        JobDto jobDto = jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }
    //Build Get all Jobs REST API
    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs(){
        List<JobDto> jobs = jobService.getAllJobs();
        if (jobs.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return HTTP 204 No Content
        }
        return ResponseEntity.ok(jobs);
    }
    //Build update Job REST API
    @PutMapping("{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable("id") Long jobId,@RequestBody JobDto updatedJob) {
        JobDto jobDto = jobService.updateJob(jobId, updatedJob);
        return ResponseEntity.ok(jobDto);
    }
    //Build Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job deleted succesfully! ");
    }
}
