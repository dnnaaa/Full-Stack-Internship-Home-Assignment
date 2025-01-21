package ma.dnaengineering.backend.controller;


import ma.dnaengineering.backend.common.bean.BaseController;
import ma.dnaengineering.backend.common.bean.PaginatedList;
import ma.dnaengineering.backend.criteria.JobCriteria;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.service.IJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/job")
@CrossOrigin("*")
public class JobController extends BaseController {

    @Autowired
    private IJobService iJobService;

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Long id, String[] includes, String[] excludes) throws Exception {

        JobDto job = iJobService.getJobById(id);


        return new ResponseEntity<JobDto>(job, HttpStatus.OK);

    }
    @PostMapping()
    public ResponseEntity<Long> addJob(@RequestBody JobDto jobDto) throws Exception {
        jobDto = iJobService.createJob(jobDto);
        return  new ResponseEntity<Long>(jobDto.getId(), HttpStatus.CREATED);

    }
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteJob(@RequestBody List<Long> idList) throws Exception {

        if (idList == null || idList.isEmpty())
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);

        iJobService.deleteJob(idList);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable(name = "id") Long id, @RequestBody JobDto jobDto) throws Exception{
            jobDto = iJobService.updateJob(id, jobDto);
            return ResponseEntity.ok(jobDto);
    }


    @PostMapping("/paginatedListByCriteria")
    public @ResponseBody
    ResponseEntity<PaginatedList> paginatedListJob(@RequestBody JobCriteria jobCriteria) throws Exception {

        List<JobDto> list = iJobService.paginatedListJobs(jobCriteria,jobCriteria.getPage(),jobCriteria.getMaxResults(), jobCriteria.getSortOrder(), jobCriteria.getSortField());

        PaginatedList paginatedList=new PaginatedList();
        paginatedList.setList(list);
        if (list != null && !list.isEmpty()) {
            int dateSize = iJobService.getJobDataSize(jobCriteria);
            paginatedList.setDataSize(dateSize);
        }

        return new ResponseEntity<PaginatedList>(paginatedList, HttpStatus.OK);

    }
}
