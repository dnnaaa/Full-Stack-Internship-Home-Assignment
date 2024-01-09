// Display the CSV file data as a Table
import Employee from "../Employee";
import axios from "axios";
import { BASE_URL, EMPLOYEES_ENDPOINT } from "../pages/api/ApiKey";

export const fetchEmployee = async (setEmployees, setError) => {
  try {
    const response = await axios.get(BASE_URL + EMPLOYEES_ENDPOINT);
    setEmployees(
      response.data.map((employeeData) => {
        // Assuming Employee class has properties matching the API response
        return new Employee(
          employeeData.id,
          employeeData.name,
          employeeData.jobTitle,
          employeeData.salary
        );
      })
    );
  } catch (error) {
    console.error("Error fetching employee data:", error);
    setError("Error fetching employee data. Please try again.");
  }
};
