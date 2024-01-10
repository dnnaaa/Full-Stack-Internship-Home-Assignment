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


## Assignment Solution 

### 1. Approach

### Backend Development
- **Spring Boot Setup**: Initialized a Spring Boot project to handle CSV file processing and API creation.
- **CSV Parsing**: Implemented a service to read and parse the `employees.csv` file. This service extracts data into Employee and SalarySummary models.
- **Data Processing**: Added functionality to calculate average salaries for each job title and compile a list of employee details.
- **API Endpoints**: Created RESTful endpoints to handle file uploads and provide processed data to the frontend.

### Testing
- Conducted unit testing for the Java service using JUnit to ensure reliability and accuracy of data processing.
  
### Frontend Development
- **Next.js Setup**: Established a Next.js project with React for the user interface.
- **UI Components**: Developed components for file upload, data display, and navigation. Integrated state management for handling file uploads and displaying results.
- **Frontend-Backend Integration**: Connected the frontend with the backend through RESTful APIs, ensuring seamless data flow between the two.
- **User Interface**: Focused on creating an intuitive and responsive user interface, enhancing user experience.

#### Interfaces 
- **Interface-1**: Contain an upload button.
  
![image](https://github.com/el-moudni-hicham/Full-Stack-Internship-Home-Assignment/assets/85403056/5fb9bdaf-fa2c-4200-bd0b-de9a34ea4282)

![image](https://github.com/el-moudni-hicham/Full-Stack-Internship-Home-Assignment/assets/85403056/f5d65d33-d695-4c90-85c9-6c1f123a0c1a)


- **Interface-2**: The Process button is added when you choose a file.

![image](https://github.com/el-moudni-hicham/Full-Stack-Internship-Home-Assignment/assets/85403056/20848d90-47a9-40a4-8797-be7574babf74)

- **Interface-3**: 2 Tables showing the processing results.

![image](https://github.com/el-moudni-hicham/Full-Stack-Internship-Home-Assignment/assets/85403056/0e8ea082-de2a-4146-8e3d-b3d1eea52999)

  
### 2. Running the Project

### Prerequisites
- Java 17
- Node.js v20.10.0

### Backend Setup
1. Navigate to the backend project directory.
2. Build the project using:
   
   ```
   ./mvnw clean install
   ```
   
3. Run the Spring Boot application:
   
   ```
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend project directory.
2. Install the necessary dependencies:
   
   ```
   npm install
   ```
3. Start the Next.js application:
   
   ```
   npm run dev
   ```

### Using the Application

1. Open the frontend application in a web browser at `localhost:3000`.
2. Upload the `employees.csv` file using the provided upload button.
3. View the processed data in the displayed tables.
