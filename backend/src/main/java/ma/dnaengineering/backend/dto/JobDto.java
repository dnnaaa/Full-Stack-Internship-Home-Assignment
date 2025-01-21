package ma.dnaengineering.backend.dto;


import ma.dnaengineering.backend.common.bean.AuditBaseDto;
import ma.dnaengineering.backend.common.util.Utils;
import ma.dnaengineering.backend.entity.Job;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobDto extends AuditBaseDto
{
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;


    public JobDto(Job job) {
        super();
        convertToDto(this,job, false, 0);
    }
    public JobDto(Job job, boolean collections, int level) {
        super();
        convertToDto(this, job, collections, level);
    }
    public JobDto convertIdToDto(JobDto jobDto, Job job) {

        jobDto.setId(job.getId());

        return jobDto;
    }
    public Job convertIdToEntity(Job job, JobDto jobDto) {
        job.setId(jobDto.getId());
        return job;
    }
    public JobDto convertToDto(JobDto jobDto, Job job, boolean collections, int level) {

        level++;
        if (jobDto != null && level <= maxLevel) {
            jobDto = convertIdToDto(jobDto,job);
            jobDto.setTitle(job.getTitle());
            jobDto.setDescription(job.getDescription());
            jobDto.setLocation(job.getLocation());
            jobDto.setSalary(job.getSalary());

            jobDto.setCreatedBy(job.getCreatedBy());
            jobDto.setCreatedOn(Utils.dateTimeToString(job.getCreatedOn()));
            jobDto.setUpdatedBy(job.getUpdatedBy());
            jobDto.setUpdatedOn(Utils.dateTimeToString(job.getUpdatedOn()));

            if (collections) {
            }
        }
        return jobDto;
    }

    public Job convertToEntity(Job job, JobDto jobDto) {
        if (job != null) {
            job = convertIdToEntity(job,jobDto);
            job.setTitle(jobDto.getTitle());
            job.setDescription(jobDto.getDescription());
            job.setLocation(jobDto.getLocation());
            job.setSalary(jobDto.getSalary());


        }
        return job;
    }
}
