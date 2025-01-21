package ma.dnaengineering.backend.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.configs.MessageConfig;
import ma.dnaengineering.backend.messages.Message;
import ma.dnaengineering.backend.requests.JobRequest;
import ma.dnaengineering.backend.dto.JobDTO;
import ma.dnaengineering.backend.responses.JobResponse;
import ma.dnaengineering.backend.services.JobService;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Objects;

@RestController
@RequestMapping("/jobs")
@AllArgsConstructor
@Validated

public class JobController {

    private final JobService jobService;
    private final ModelMapper modelMapper;
    private final MessageSource messageSource;

    @GetMapping()
    public ResponseEntity<?> getAllJobs(@RequestParam(defaultValue = "10") int size ,
                                        @RequestParam(defaultValue = "0") int page ,
                                                @RequestParam(defaultValue = "id") String sortBy,
                                                @RequestParam(defaultValue = "asc") String order
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order), sortBy));
        Page<JobDTO> jobs = jobService.getAllJobs(pageable);
        return ResponseEntity.ok().body(jobs.map(job -> modelMapper.map(job, JobResponse.class)));

    }

    @PostMapping()
    public ResponseEntity<?> addJob(@Valid @RequestBody JobRequest jobRequest) {
        JobDTO jobDTO = modelMapper.map(jobRequest,JobDTO.class);
        return ResponseEntity.ok().body(jobService.createJob(jobDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable @Positive(message = "ID is required and must be a positive number") long id) {
        JobDTO jobDTO = jobService.getJob(id);
        if (Objects.isNull(jobDTO))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage(Message.JOB_NOT_FOUND,null, Locale.getDefault()));
        return ResponseEntity.ok().body(jobDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable @Positive(message = "ID is required and must be a positive number.") long id, @Valid @RequestBody JobRequest jobRequest) {
        if(!jobService.checkIfJobExist(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageSource.getMessage(Message.JOB_NOT_FOUND,null, Locale.getDefault()));

        JobDTO jobDTO = modelMapper.map(jobRequest,JobDTO.class);
        jobDTO.setId(id);
        jobService.updateJob(jobDTO);
        return ResponseEntity.ok().body(messageSource.getMessage(Message.JOB_UPDATED,null, Locale.getDefault()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable @Positive(message = "ID is required and must be a positive number") long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok().body(messageSource.getMessage(Message.JOB_DELETED,null, Locale.getDefault()));
    }
}
