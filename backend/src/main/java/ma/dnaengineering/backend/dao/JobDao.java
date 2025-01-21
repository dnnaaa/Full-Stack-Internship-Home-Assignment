package ma.dnaengineering.backend.dao;

import ma.dnaengineering.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobDao extends JpaRepository<Job, Long>, PagingAndSortingRepository<Job, Long> {
}
