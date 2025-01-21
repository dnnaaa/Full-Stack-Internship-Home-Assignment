package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.criteria.JobCriteria;
import ma.dnaengineering.backend.dto.JobDto;

import java.util.List;

public interface IJobService {

    JobDto createJob(JobDto jobDto) throws Exception;

    JobDto updateJob(Long id, JobDto jobDto) throws Exception;

    /**
     * deleteJob.
     *
     * @param jobList
     * @throws Exception
     */
    void deleteJob(List<Long> idList) throws Exception;


    List<JobDto> getJobsByCriteria(JobCriteria jobCriteria);

    /**
     * paginatedListJobs.
     *
     * @param jobCriteria
     * @param page
     * @param pageSize
     * @param order
     * @param sortField
     * @return List<JobDto>
     * @throws Exception
     */

    List<JobDto> paginatedListJobs(JobCriteria jobCriteria, int page, int pageSize, String order, String sortField) throws Exception;
    int getJobDataSize(JobCriteria jobCriteria);

    /**
     * getJobById.
     *
     * @param jobId
     * @return JobDto
     * @throws Exception
     */

    JobDto getJobById(Long jobId) throws Exception;
}
