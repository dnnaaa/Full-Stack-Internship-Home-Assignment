package ma.dnaengineering.backend.Controller;

import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.createAJob(job));
    }


    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(){
        return ResponseEntity.ok(jobService.getAllJobs());
    }


    @GetMapping("/{id}")
    public  ResponseEntity<Job> getJobById(@PathVariable("id") long id){
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJobById(@PathVariable long id, @RequestBody Job job){
        return ResponseEntity.ok(jobService.updateJob(id,job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

}
