package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface JobService {
    Job save(Job job);
    boolean exists(Long id);
    Optional<Job> findById(Long id);
    List<Job> findAll();
    Page<Job> findAll(Pageable pageable);
    void deleteById(Long id);

}
