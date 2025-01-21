package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface IJobRepository extends JpaRepository<Job,Long>, JpaSpecificationExecutor<Job> {

}
