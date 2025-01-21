package ma.dnaengineering.backend.Controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.DTO.JobRequest;
import ma.dnaengineering.backend.DTO.JobResponse;
import ma.dnaengineering.backend.Service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("/jobs")
@CrossOrigin("*")
public class JobController {

    private JobService jobService;

    @GetMapping()
    public ResponseEntity<?> getAllJobs(@RequestParam(defaultValue = "0") int page ,@RequestParam(defaultValue = "5") int size

    ) {
        Page<?> jobResponsePage = jobService.getAllJobs(PageRequest.of(page, size));
        return ResponseEntity.ok().body(jobResponsePage);

    }

    @PostMapping()
    public ResponseEntity<?> addJob(@Valid @RequestBody JobRequest jobRequest) {
        return ResponseEntity.ok().body(jobService.saveJob(jobRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable long id) {
        JobResponse jobResponse = jobService.getJob(id);
        if (jobResponse == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(jobResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable long id, @Valid @RequestBody JobRequest jobRequest) {
        if(jobService.updateJob(jobRequest,id)) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok().build();
    }
}
