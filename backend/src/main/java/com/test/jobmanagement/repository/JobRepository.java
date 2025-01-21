package com.test.jobmanagement.repository;

import com.test.jobmanagement.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {




}
