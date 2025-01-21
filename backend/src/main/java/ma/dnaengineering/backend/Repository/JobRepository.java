package ma.dnaengineering.backend.Repository;

import ma.dnaengineering.backend.Entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    Job findById(long id);
    Page<Job> findAll(Pageable pageable);


}
