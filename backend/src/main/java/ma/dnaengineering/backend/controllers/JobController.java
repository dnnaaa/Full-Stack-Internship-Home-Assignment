package ma.dnaengineering.backend.controllers;


import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.DAO.entities.Job;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;


    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job){
        Job savedJob = jobService.addJob(job);
        if (savedJob!=null){
            return new ResponseEntity<>(savedJob,HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Invalid Request Body",HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<?> getAllJobs(){
        return new ResponseEntity<>(jobService.getAllJob(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable("id") Long id){
        Job job = jobService.getJob(id);

        if (job!=null) {
            return new ResponseEntity<>(job, HttpStatus.OK);
        }

        return new ResponseEntity<>("Job Not Found",HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable("id") Long id, @RequestBody Job job){
        System.out.println(job);
        Job updatedJob = jobService.updateJob(id, job);
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable("id") Long id){
        Boolean jobDeleted = jobService.deleteJob(id);
        System.out.println(jobDeleted);
        if (jobDeleted){
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }
        return new ResponseEntity<>("Error Deleting Job",HttpStatus.INTERNAL_SERVER_ERROR);

    }




}
