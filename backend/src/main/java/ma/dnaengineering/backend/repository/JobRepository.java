package ma.dnaengineering.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.dnaengineering.backend.model.Job;


public interface JobRepository extends JpaRepository<Job, Long>  {

}
