package ma.dnaengineering.backend.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import ma.dnaengineering.backend.common.bean.AuditBusinessObject;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Getter
@Setter
@Entity
@Table(name = Job.Constants.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@GenericGenerator(name = "jobSequenceGenerator", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator", parameters = {
        @Parameter(name = "sequence_name", value = "job_seq"),
        @Parameter(name = "increment_size", value = "1") })
public class Job extends AuditBusinessObject {

    @Id
    @Column(name = Constants.COLUMN_ID_NAME)
    @GeneratedValue(generator = "jobSequenceGenerator")
    private Long id;

    @Column(name = Constants.COLUMN_TITLE_NAME, nullable = false)
    private String title;

    @Column(name = Constants.COLUMN_DESCRIPTION_NAME, nullable = false)
    private String description;

    @Column(name = Constants.COLUMN_LOCATION_NAME)
    private String location;

    @Column(name = Constants.COLUMN_SALARY_NAME)
    private Double salary;



    public static class Constants {
        public static final String TABLE_NAME = "job_";
        public static final String COLUMN_ID_NAME = "id_job";
        public static final String COLUMN_TITLE_NAME = "title";
        public static final String COLUMN_DESCRIPTION_NAME = "description";
        public static final String COLUMN_LOCATION_NAME = "location";
        public static final String COLUMN_SALARY_NAME = "salary";
    }
}
