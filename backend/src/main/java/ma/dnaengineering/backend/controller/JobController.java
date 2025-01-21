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

    @GetMapping("/{id}")
    public ResponseEntity<JobData> getJob(@PathVariable Long id) {
        JobData jobData = jobFacade.findById(id);
        if (jobData == null) {
            return ResponseEntity.notFound().build();
        }
        else return ResponseEntity.ok(jobData);
    }

    @GetMapping("/not-paged")
    public ResponseEntity<List<JobData>> getJobs() {
        return ResponseEntity.ok(jobFacade.findAll());
    }
    @GetMapping
    public ResponseEntity<PageData> getJobsPaged(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(jobFacade.getPage(PageRequest.of(page, size)));
    }

    @PostMapping
    public ResponseEntity<JobData> createJob(@RequestBody JobData jobData) {
        JobData result = jobFacade.create(jobData);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobData> updateJob(@PathVariable("id") Long id,@RequestBody JobData jobData) {
        JobData result = jobFacade.update(id, jobData);
        if (jobData == null) {
            return ResponseEntity.notFound().build();
        } else{
            return ResponseEntity.ok(result);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JobData> deleteJob(@PathVariable("id") Long id) {
        jobFacade.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
