package ma.dnaengineering.backend.specification;

import ma.dnaengineering.backend.criteria.JobCriteria;
import ma.dnaengineering.backend.entity.Job;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class JobSpecification implements Specification<Job> {
    private JobCriteria jobCriteria;
    private boolean distinct;

    public JobSpecification(JobCriteria criteria) {
        this.jobCriteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Job> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();
        if (jobCriteria != null) {
            if (jobCriteria.getId() != null && jobCriteria.getId() > 0) {
                predicates.add(builder.equal(root.<String>get("id"), jobCriteria.getId()));
            }
            if (jobCriteria.getIdsIn() != null && !jobCriteria.getIdsIn().isEmpty()) {
                predicates.add(root.<Long>get("id").in(jobCriteria.getIdsIn()));
            }
            if (jobCriteria.getIdsNotIn() != null && !jobCriteria.getIdsNotIn().isEmpty()) {
                predicates.add(builder.not(root.<Long>get("id").in(jobCriteria.getIdsNotIn())));
            }
            if (jobCriteria.getNotId() != null && jobCriteria.getNotId() > 0) {
                predicates.add(builder.notEqual(root.<Boolean>get("id"), jobCriteria.getNotId()));
            }
            if (jobCriteria.getTitle() != null && !jobCriteria.getTitle().isEmpty()) {
                predicates.add(builder.equal(root.<String>get("title"), jobCriteria.getTitle()));
            }
            if (jobCriteria.getTitleLike() != null && !jobCriteria.getTitleLike().isEmpty()) {
                Expression<String> path = root.<String>get("title");
                Expression<String> lower = builder.lower(path);
                predicates.add(builder.like(lower, "%" + jobCriteria.getTitleLike().toLowerCase() + "%"));
            }
            if (jobCriteria.getDescription() != null && !jobCriteria.getDescription().isEmpty()) {
                predicates.add(builder.equal(root.<String>get("description"), jobCriteria.getDescription()));
            }
            if (jobCriteria.getDescriptionLike() != null && !jobCriteria.getDescriptionLike().isEmpty()) {
                Expression<String> path = root.<String>get("description");
                Expression<String> lower = builder.lower(path);
                predicates.add(builder.like(lower, "%" + jobCriteria.getDescriptionLike().toLowerCase() + "%"));
            }
            if (jobCriteria.getLocation() != null && !jobCriteria.getLocation().isEmpty()) {
                predicates.add(builder.equal(root.<String>get("location"), jobCriteria.getLocation()));
            }
            if (jobCriteria.getLocationLike() != null && !jobCriteria.getLocationLike().isEmpty()) {
                Expression<String> path = root.<String>get("location");
                Expression<String> lower = builder.lower(path);
                predicates.add(builder.like(lower, "%" + jobCriteria.getLocationLike().toLowerCase() + "%"));
            }
            if (jobCriteria.getSalary() != null) {
                predicates.add(builder.equal(root.<Double>get("salary"), jobCriteria.getSalary()));
            }
            if (jobCriteria.getFilterName() != null
                    && !jobCriteria.getFilterName().isEmpty()
                    && jobCriteria.getFilterWord() != null
                    && !jobCriteria.getFilterWord().isEmpty()) {
                Expression<String> path = root.<String>get(jobCriteria.getFilterName());
                Expression<String> lower = builder.lower(path);
                predicates.add(builder.like(lower, "%" + jobCriteria.getFilterWord().toLowerCase() + "%"));
            }

            // A comprendre !!!!!!!!!
            if (jobCriteria.getOrderByAsc() != null && jobCriteria.getOrderByAsc().length > 0) {
                List<Order> orderList = new ArrayList<Order>();
                for (int i = 0; i < jobCriteria.getOrderByAsc().length; i++) {
                    orderList.add(builder.asc(root.get(jobCriteria.getOrderByAsc()[i])));
                }
                query.orderBy(orderList);
            }
            if (jobCriteria.getOrderByDesc() != null && jobCriteria.getOrderByDesc().length > 0) {
                List<Order> orderList = new ArrayList<Order>();
                for (int i = 0; i < jobCriteria.getOrderByDesc().length; i++) {
                    orderList.add(builder.desc(root.get(jobCriteria.getOrderByDesc()[i])));
                }
                query.orderBy(orderList);
            }
        }
        if (distinct)
            query.distinct(true);
        return andTogether(predicates, builder);
    }

    private Predicate andTogether(List<Predicate> predicates, CriteriaBuilder cb) {
        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
