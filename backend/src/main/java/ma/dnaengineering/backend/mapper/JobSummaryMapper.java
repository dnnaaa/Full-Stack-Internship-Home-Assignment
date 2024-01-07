package ma.dnaengineering.backend.mapper;

import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.entity.JobSummary;

public abstract class JobSummaryMapper {

    /**
     * Maps the given title and average salary to a JobSummary object.
     *
     * @param  title          the title of the job
     * @param  averageSalary  the average salary of the job
     * @return                the JobSummary object with the mapped values
     */
    public static JobSummary mapToJobSummary(String title, Float averageSalary) {
        JobSummary jobSummary = new JobSummary();
        jobSummary.setTitle(title);
        jobSummary.setAverageSalary(averageSalary);
        return jobSummary;
    }

    /**
     * Maps a JobSummary object to a JobSummaryDTO object.
     *
     * @param  jobSummary  the JobSummary object to be mapped
     * @return             the mapped JobSummaryDTO object
     */
    public static JobSummaryDTO mapToJobSummaryDTO(JobSummary jobSummary) {
        JobSummaryDTO jobSummaryDTO = new JobSummaryDTO();
        jobSummaryDTO.setId(jobSummary.getId());
        jobSummaryDTO.setTitle(jobSummary.getTitle());
        jobSummaryDTO.setAverageSalary(jobSummary.getAverageSalary());
        return jobSummaryDTO;
    }
}
