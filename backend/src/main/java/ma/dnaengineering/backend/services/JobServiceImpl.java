package ma.dnaengineering.backend.services;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dto.JobDTO;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{
    private final JobRepository jobRepository;
    //create
    @Override
    public boolean createJob(JobDTO jobDTO) {
        try{
            //convertir JobDTO to entity Job
            Job job = JobDTO.toEntity(jobDTO);
            //save job dans database
            Job savedJob = jobRepository.save(job);
            //si la creation a réussi return true
            return savedJob != null;
        } catch (Exception e) {
            //en cas d'erreur retuen false
            e.printStackTrace();
            return false;
        }
    }

    //update
    @Override
    public boolean updateJob(int id, JobDTO jobDTO) {
        try{
            //verifier si le job exist dans la base de donnée
            Job existingJob = jobRepository.findById((long) id).orElse(null);
            //si job n'existe pas return false
            if(existingJob == null){
                return false;
            }
            //sinon modifier les infos du job
            existingJob.setTitle(jobDTO.title());
            existingJob.setDescription(jobDTO.description());
            existingJob.setLocation(jobDTO.location());
            existingJob.setSalary(jobDTO.salary());
            //save le job enregistré
            Job updatedJob = jobRepository.save(existingJob);
            return updatedJob != null;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    //delete
    @Override
    public boolean deleteJob(int id) {
        try{
            Job existingJob = jobRepository.findById((long) id).orElse(null);
            if (existingJob == null) {
                return false;
            }
            jobRepository.delete(existingJob);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //get job by id
    @Override
    public JobDTO getJob(int id) {
        try {
            Job job = jobRepository.findById((long) id).orElse(null);
            if (job == null) {
                return null;
            }
            return JobDTO.toDto(job);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //get list of jobs
    @Override
    public List<JobDTO> getAllJobs() {
        try {
            List<Job> jobs = jobRepository.findAll();

            //mapper la list des jobs et convertir chaque job au JobDTO
            return jobs.stream()
                    .map(JobDTO::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
