package ma.dnaengineering.backend.facade.impl;

import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.converter.impl.JobConverter;
import ma.dnaengineering.backend.converter.impl.PageConverter;
import ma.dnaengineering.backend.dto.JobData;
import ma.dnaengineering.backend.dto.PageData;
import ma.dnaengineering.backend.facade.JobFacade;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Slf4j
public class DefaultJobFacade implements JobFacade {
    private final JobService jobService;
    private final JobConverter jobConverter;
    private final PageConverter pageConverter;

    public DefaultJobFacade(JobService jobService, JobConverter jobConverter, PageConverter pageConverter) {
        this.jobService = jobService;
        this.jobConverter = jobConverter;
        this.pageConverter = pageConverter;
    }

    @Override
    public JobData findById(Long id) {
        Optional<Job> jobOptional = jobService.findById(id);
        return jobOptional.map(jobConverter::convert).orElse(null);
    }

    @Override
    public JobData create(JobData jobData) {
        try {
            Job job = jobService.save(jobConverter.convertReverse(jobData));
            return jobConverter.convert(job);
        } catch (Exception e) {
            log.error("Error while creating job", e);
        }
        return null;
    }

    @Override
    public JobData update(Long id, JobData jobData) {
        try {
            if (jobService.exists(id)) {
                jobData.setId(id);
                Optional<Job> jobOptional = jobService.findById(id);
                if (jobOptional.isPresent()) {
                    Job job = jobOptional.get();
                    Job jobToSave = jobConverter.convertReverse(jobData);
                    jobToSave.setId(id);
                    jobToSave.setPostedAt(job.getPostedAt());
                    jobService.save(jobToSave);
                    return jobConverter.convert(jobToSave);
                }
            }
        } catch (Exception e) {
            log.error("Error while updating job", e);
        }
        return null;
    }

    @Override
    public List<JobData> findAll() {
        List<Job> jobs = jobService.findAll();
        return jobs.stream().map(jobConverter::convert).toList();
    }

    @Override
    public PageData getPage(Pageable pageable) {
        Page<Job> page = jobService.findAll(pageable);
        return pageConverter.convert(page);
    }

    @Override
    public void deleteById(Long id) {
        jobService.deleteById(id);
    }
}
