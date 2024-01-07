package ma.dnaengineering.backend.Repository;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import static org.junit.jupiter.api.Assertions.assertEquals;
import ma.dnaengineering.backend.Entity.Employee;

@DataJpaTest
public class EmployeeRepositoryTest {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@BeforeEach
	void setUp() {
		Employee employee1=
				Employee.builder().
				employeeName("Kimberly Allen").
				employeeJobTitle("IT").
				employeeSalary(13428.0)
				.build();
		Employee employee2=
				Employee.builder().
				employeeName("Jason Johnson").
				employeeJobTitle("IT").
				employeeSalary(10087.0)
				.build();
		entityManager.persist(employee1);
		entityManager.persist(employee2);
	}
	@Test
	public void getJobTitleAverageSalaries() {
		List<Map<String,Double>> rs=employeeRepository.getJobTitleAverageSalaries();
		 Map<String, Double> premiereMap = rs.get(0);
		 String cle;
		 Double valeur=0.0;
		 for (Map.Entry<String,Double> me : 
			 premiereMap.entrySet()) { 
  
            // Printing keys and values
			 cle=me.getKey(); 
			 Object valeurObjet =me.getValue(); 
			// Check if the value is an instance of Double
			 if (valeurObjet instanceof Double) {
			        valeur = (Double) valeurObjet;

			 	} 
			
        } 
		 
		assertEquals(valeur, 11757.5);
		
	}
}
