package ma.dnaengineering.backend.Service;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.DTO.JobRequest;
import ma.dnaengineering.backend.DTO.JobResponse;
import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobService  {

    private JobRepository jobRepository;

    public JobResponse getJob(long id) {
        Job job = jobRepository.findById(id);
        if (job == null)
            return null;
        return buildJobResponse(job);
    }


    public Page<JobResponse> getAllJobs(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAll(pageable);
        return jobs.map(this::buildJobResponse);
    }


    public JobResponse saveJob(JobRequest jobRequest) {
        Job job = jobRepository.save(buildJob(jobRequest));
        return buildJobResponse(job);
    }


    public boolean updateJob(JobRequest jobRequest, long id) {
        if(! jobRepository.existsById(id)) return false;
        Job job = buildJob(jobRequest);
        job.setId(id);
        jobRepository.save(job);
        return true;
    }


    public void deleteJob(long id) {
        jobRepository.deleteById(id);
    }

    public JobResponse buildJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .location(job.getLocation())
                .salary(job.getSalary())
                .description(job.getDescription())
                .build();
    }

    public Job buildJob(JobRequest jobRequest) {
        return Job.builder()
                .title(jobRequest.getTitle())
                .location(jobRequest.getLocation())
                .salary(jobRequest.getSalary())
                .description(jobRequest.getDescription())
                .build();
    }


}