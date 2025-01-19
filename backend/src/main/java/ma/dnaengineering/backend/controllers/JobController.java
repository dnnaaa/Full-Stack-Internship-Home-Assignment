package ma.dnaengineering.backend.controllers;

import jakarta.validation.Valid;
import ma.dnaengineering.backend.dtos.AddJobDto;
import ma.dnaengineering.backend.dtos.UpdateJobDto;
import ma.dnaengineering.backend.interfaces.IJobService;
import ma.dnaengineering.backend.models.Job;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final IJobService _JobService;

    public JobController(IJobService JobService) {
        _JobService = JobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getJobs() {
        List<Job> Jobs = _JobService.GetAllJobs();
        return new ResponseEntity<>(Jobs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        Job Job = _JobService.GetJobById(id);
        return new ResponseEntity<>(Job, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody AddJobDto addJobDto) {
        Job newJob = new Job();
        newJob.setTitle(addJobDto.getTitle());
        newJob.setDescription(addJobDto.getDescription());
        newJob.setLocation(addJobDto.getLocation());
        newJob.setSalary(addJobDto.getSalary());
        Job createdJob = _JobService.AddJob(newJob);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody UpdateJobDto updateJobDto) {
        Job existingJob = _JobService.GetJobById(id);
        existingJob.setTitle(updateJobDto.getTitle());
        existingJob.setDescription(updateJobDto.getDescription());
        existingJob.setLocation(updateJobDto.getLocation());
        existingJob.setSalary(updateJobDto.getSalary());
        Job updatedJob = _JobService.UpdateJob(id, existingJob);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        Job deletedJob = _JobService.GetJobById(id);
        _JobService.DeleteJob(id);
        return ResponseEntity.ok(deletedJob);
    }
}
