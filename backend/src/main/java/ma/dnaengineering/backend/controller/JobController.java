package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.dto.JobData;
import ma.dnaengineering.backend.dto.PageData;
import ma.dnaengineering.backend.facade.JobFacade;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("http://localhost:3000")
public class JobController {
    private final JobFacade jobFacade;

    public JobController(JobFacade jobFacade) {
        this.jobFacade = jobFacade;
    }

    //Get a job by id
    @GetMapping("/{id}")
    public ResponseEntity<JobData> getJob(@PathVariable Long id) {
        JobData jobData = jobFacade.findById(id);
        if (jobData == null) {
            return ResponseEntity.notFound().build();
        }
        else return ResponseEntity.ok(jobData);
    }

    //Get all the jobs with no paging index
    @GetMapping("/not-paged")
    public ResponseEntity<List<JobData>> getJobs() {
        return ResponseEntity.ok(jobFacade.findAll());
    }

    //Get a bunch of jobs indexed with a page number
    @GetMapping
    public ResponseEntity<PageData> getJobsPaged(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(jobFacade.getPage(PageRequest.of(page, size)));
    }

    //Creating a job using a job facade
    @PostMapping
    public ResponseEntity<JobData> createJob(@RequestBody JobData jobData) {
        JobData result = jobFacade.create(jobData);
        return ResponseEntity.ok(result);
    }

    //Updating a job using a job facade
    @PutMapping("/{id}")
    public ResponseEntity<JobData> updateJob(@PathVariable("id") Long id,@RequestBody JobData jobData) {
        JobData result = jobFacade.update(id, jobData);
        if (jobData == null) {
            return ResponseEntity.notFound().build();
        } else{
            return ResponseEntity.ok(result);
        }
    }

    //Delete a job
    @DeleteMapping("/{id}")
    public ResponseEntity<JobData> deleteJob(@PathVariable("id") Long id) {
        jobFacade.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
