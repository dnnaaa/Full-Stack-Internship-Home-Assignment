package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.JobDTO;

import java.util.List;


public interface JobService {
    //return boolean pour faciliter les testes
    boolean createJob(JobDTO jobDTO);
    boolean updateJob(int id, JobDTO jobDTO);
    boolean deleteJob(int id);
    JobDTO getJob(int id);
    List<JobDTO> getAllJobs();

}
