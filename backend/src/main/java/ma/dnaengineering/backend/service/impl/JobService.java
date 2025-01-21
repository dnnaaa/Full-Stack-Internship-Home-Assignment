package ma.dnaengineering.backend.service.impl;


import ma.dnaengineering.backend.common.exception.EntityNotFoundException;
import ma.dnaengineering.backend.criteria.JobCriteria;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.service.IJobService;
import ma.dnaengineering.backend.specification.JobSpecification;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.repository.IJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService implements IJobService {

    @Autowired
    private IJobRepository jobRepository;


    /**
     * createJob.
     * service pour ajouter une job
     * @author abdessamad
     * @param jobDto
     * @return JobDto
     * @throws Exception
     */
    @Override
    public JobDto createJob(JobDto jobDto) throws Exception {
        Job job = new Job();
        job = jobDto.convertToEntity(job, jobDto);
        job = jobRepository.save(job);
        jobDto.setId(job.getId());
        return jobDto;
    }


    /**
     * updateJob.
     * service pour mettre à jour une job
     * @author abdessamad
     * @param jobDto
     * @return JobDto
     * @throws Exception
     */
    @Override
    public JobDto updateJob(Long id, JobDto jobDto) throws Exception {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("errors.notFound", new String[] { Job.class.getSimpleName(), jobDto.getId().toString() }));
        jobDto.setId(id);
        job = jobDto.convertToEntity(job, jobDto);
        jobRepository.save(job);
        return jobDto;
    }

    /**
     * deleteJob.
     *
     * @param idList
     * @throws Exception
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteJob(List<Long> idList) throws Exception {


        if (idList != null)
            for (Long id : idList) {
                Job toBeDeleted = jobRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("errors.notFound", new String[] { Job.class.getSimpleName(), id.toString() }));

                jobRepository.delete(toBeDeleted);

            }
    }

    /**
     * getJobsByCriteria.
     * service pour récuperer une list des jobs suivant des critère
     * @author abdessamad
     * @param jobCriteria
     * @return List<JobDto>
     */
    @Override
    public List<JobDto> getJobsByCriteria(JobCriteria jobCriteria) {
        Specification<Job> specification = new JobSpecification(jobCriteria);
        if(jobCriteria.isPeagable()){
            Pageable pageable = PageRequest.of(0,jobCriteria.getMaxResults());
            return jobRepository.findAll(specification,pageable)
                    .stream()
                    .map((job -> new JobDto(job))).collect(Collectors.toList());
        }else
            return jobRepository.findAll(specification)
                    .stream()
                    .map((job -> new JobDto(job))).toList();
    }

    /**
     * paginatedListHopitals.
     *
     * @param jobCriteria
     * @param page
     * @param pageSize
     * @param order
     * @param sortField
     * @return List<HopitalDto>
     * @throws Exception
     */
    @Override
    public List<JobDto> paginatedListJobs(JobCriteria jobCriteria, int page, int pageSize, String order, String sortField) throws Exception {

        Specification<Job> specification = new JobSpecification(jobCriteria);
        order = order != null && !order.isEmpty() ? order : "desc";
        sortField = sortField != null && !sortField.isEmpty() ? sortField : "id";
        Pageable pageable = PageRequest.of(page, pageSize, Sort.Direction.fromString(order), sortField);

        return jobRepository.findAll(specification, pageable)
                .stream()
                .map(job -> new JobDto(job))
                .collect(Collectors.toList());
    }

    /**
     * getJobDataSize.
     * service pour calculer le nombre des nuplet pour une requete prédéfinie
     * @author abdessamad
     * @param jobCriteria
     * @return entier
     */
    @Override
    public int getJobDataSize(JobCriteria jobCriteria) {
        Specification<Job> specification = new JobSpecification(jobCriteria, true);
        return ((Long)  jobRepository.count(specification)).intValue();
    }

    /**
     * getJobById.
     *
     * @param jobId
     * @return JobDto
     * @throws Exception
     */
    public JobDto getJobById(Long jobId) throws Exception {

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new EntityNotFoundException("errors.notFound", new String[] { Job.class.getSimpleName(), jobId.toString() }));

        return  new JobDto(job, true, 0);

    }

}




