package ma.dnaengineering.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.dnaengineering.backend.bo.Job;

public interface IJobRepositry extends JpaRepository<Job,Long>{

}
