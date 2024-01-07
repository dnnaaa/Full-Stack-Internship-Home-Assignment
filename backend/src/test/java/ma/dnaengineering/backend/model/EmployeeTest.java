package ma.dnaengineering.backend.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class EmployeeTest {

    @Test
    void testEmployeeCreation() {
        Employee employee = new Employee(1, "John Doe", "Developer", 50000.0);

        assertEquals(1, employee.getId());
        assertEquals("John Doe", employee.getEmployeeName());
        assertEquals("Developer", employee.getJobTitle());
        assertEquals(50000.0, employee.getSalary());
    }
}

