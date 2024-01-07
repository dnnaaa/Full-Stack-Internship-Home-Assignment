package ma.dnaengineering.backend.entitys;

//Employee.java
public class Employee {
	private Long id;
	private String name;
	private String jobTitle;
	private Double salary;

	public Employee(Long id, String name, String jobTitle, Double salary) {
		super();
		this.id = id;
		this.name = name;
		this.jobTitle = jobTitle;
		this.salary = salary;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

}
