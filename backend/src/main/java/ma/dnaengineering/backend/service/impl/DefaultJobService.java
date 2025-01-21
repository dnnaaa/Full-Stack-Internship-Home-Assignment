package ma.dnaengineering.backend.service.impl;

import ma.dnaengineering.backend.dao.JobDao;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DefaultJobService implements JobService {
    private final JobDao jobDao;

    public DefaultJobService(JobDao jobDao) {
        this.jobDao = jobDao;
    }

    @Override
    public Job save(Job job) {
        return jobDao.save(job);
    }

    @Override
    public boolean exists(Long id) {
        return jobDao.existsById(id);
    }

    @Override
    public Optional<Job> findById(Long id) {
        return jobDao.findById(id);
    }

    @Override
    public List<Job> findAll() {
        return jobDao.findAll();
    }

    @Override
    public Page<Job> findAll(Pageable pageable) {
        return jobDao.findAll(pageable);
    }

    @Override
    public void deleteById(Long id) {
        jobDao.deleteById(id);
    }
}
