package ma.dnaengineering.backend.facade;

import ma.dnaengineering.backend.dto.JobData;
import ma.dnaengineering.backend.dto.PageData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobFacade {
    JobData findById(Long id);
    JobData create(JobData job);
    JobData update(Long id, JobData job);
    List<JobData> findAll();
    PageData getPage(Pageable pageable);
    void deleteById(Long id);
}
