package ma.dnaengineering.backend.criteria;

import ma.dnaengineering.backend.common.bean.BaseCriteria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobCriteria extends BaseCriteria {
    private String title;
    private String titleLike;
    private String description;
    private String descriptionLike;
    private String location;
    private String locationLike;
    private Double salary;
}
