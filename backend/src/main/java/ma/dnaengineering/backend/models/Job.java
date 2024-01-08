package ma.dnaengineering.backend.models;

public class Job {
    public String title ;
    public Double averageSalary ;

    public Job(String jotTitle, Double average) {
        this.title = jotTitle ;
        this.averageSalary = average ;
    }
    @Override
    public String toString()  {
        return "{ "+title+", "+averageSalary+"}";
    }
}
