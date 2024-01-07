## DNA Engineering Full-Stack Assignment
Build a CSV Parser.

## Table of content
- [Prerequisites](#prerequisites)
- [Before We begin](#before-we-begin)
- [Assignment](#assignment)
- [What we expect](#what-we-expect)
- [Bonus points](#bonus-points)

## Prerequisites
- Java 17
- Node Js v20.10.0

## Before we begin
- In this assignment, you will be asked to write, and test your code.
- Make sure you respect clean code guidelines.
- Read the assignment carefully.

## Description
You are invited to create a CSV parser using Java/Spring Boot, and build UI to display results using Next.js/React.

## Assignment

### Backend (CSV Parser)

#### Tasks

- Write a service in Java that will read and process the attached CSV(comma separated values) file at `data/employees.csv`.

- This service should read, extract and process data in a suitable data structure.

- Process this data to return the list of employees and a summary indicating the average salary for each job title.

### Frontend

#### Tasks
Implement a simple user interface that will allow the user to upload the file and display the results of your processing.

#### Interfaces

Respect the following design flow:

![Frontend interfaces](./static/interfaces.png)

- **Interface-1**: Contain an upload button.
- **Interface-2**: The Process button is added when you choose a file.
- **Interface-3**: 2 Tables showing the processing results.

**Table 1**: Employee information, displays a paginated list of employees.

**Table 2**: Jobs summary, displays for each job title, the average salary for employees.

## What we expect
- Write a concise, easy to understand code.
- Use good practices.
- Write unit tests for your java code.
- Append to this README your approach and provide instructions to run your project.

## Bonus points
- Implement your own CSV file parser instead of using a library.
- Use design patterns.

# Employee Management System

## Overview

The Employee Management System is a comprehensive solution that combines a backend built with Spring Boot and a frontend developed using Next.js and React. This system allows organizations to efficiently manage their employee data and provides functionalities for parsing CSV files, calculating average salaries, and displaying the results in a user-friendly interface.

https://github.com/dnnaaa/Full-Stack-Internship-Home-Assignment/assets/86857735/77ddb3fc-e772-4b19-89b0-ccfb6bef7b1d


## Backend

The backend of the Employee Management System is implemented as a Spring Boot application. It follows a layered architecture, comprising several key components that work together to handle data processing and expose RESTful endpoints.

### Employee Class

The `Employee` class serves as the data structure for storing employee information. It contains fields such as `id`, `name`, `jobTitle`, and `salary`. This class encapsulates the properties and behaviors related to individual employees within the system.

### CSVParser Class

The `CSVParser` class provides functionality to parse CSV files that contain employee data. It utilizes libraries or custom logic to read and process the CSV content. Additionally, it calculates the average salary for each job title based on the employee records found in the CSV file.

### CsvController Class

The `CsvController` class defines the REST endpoints responsible for handling file parsing and calculating average salaries. It acts as the interface between the frontend and the backend, receiving incoming requests and triggering the appropriate actions. Within the controller, it utilizes the `CSVParser` to process the uploaded CSV file and obtain the required data.

### CsvConfig Class

The `CsvConfig` class is a configuration class annotated with `@Configuration`. It implements the `WebMvcConfigurer` interface and is responsible for configuring Cross-Origin Resource Sharing (CORS) settings for the application. This configuration ensures that the frontend, hosted on a different domain or port, can communicate with the backend without encountering any cross-origin issues.

### CsvParser Unit Tests

The `CsvParser` unit tests focus on validating the functionality of the `CSVParser` class methods. These tests cover various scenarios, such as parsing CSV data, reading the CSV content, and calculating average salaries for different job titles. The unit tests help ensure the accuracy and reliability of the backend code.

#### Instructions to Run Backend

To run the backend of the Employee Management System:

1. Ensure that you have Java and Maven installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the project's root directory.
4. Execute the command `mvn spring-boot:run`.
5. The Spring Boot application will start, and the backend will be accessible at the designated port.

## Frontend (Next.js/React)

The frontend of the Employee Management System is developed using Next.js and React. It provides a user-friendly interface that allows users to interact with the system and view employee data.

### FileUpload Component

The `FileUpload` component provides an intuitive interface for users to upload CSV files containing employee data. It allows users to select the desired CSV file from their local machine and initiates the upload process.

### ResultsTable Component

The `ResultsTable` component displays a paginated list of employees and their corresponding job titles and salaries. Additionally, it presents the average salary for each job title, providing valuable insights into the distribution of salaries across different roles within the organization.

#### Instructions to Run Frontend

To run the frontend of the Employee Management System:

1. Ensure that you have Node.js and npm (Node Package Manager) installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the project's frontend directory.
4. Execute the command `npm install` to install the required dependencies.
5. Once the installation is complete, run the command `npm run dev`.
6. The Next.js development server will start, and the frontend will be accessible at the designated port.

## Conclusion

The Employee Management System is a versatile solution that combines a robust backend built with Spring Boot and a user-friendly frontend developed using Next.js and React. It provides organizations with the necessary tools to efficiently manage employee data, parse CSV files, calculate average salaries, and visualize the results. By leveraging the power of these technologies, the system offers a seamless and intuitive experience for users, facilitating effective employee management and data analysis.
