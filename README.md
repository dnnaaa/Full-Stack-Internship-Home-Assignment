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

## Approach:

#### Backend (Java/Spring Boot):
- Created three main components: **EmployeeController**, **EmployeeService**, and **Employee** model.
- The **EmployeeController** exposes an endpoint for uploading the CSV file and processes it using the **EmployeeService**.
- **EmployeeService** handles the file reading, employee data extraction, and calculation of average salary by job title.
- **Employee** model represents the structure of an employee.
- implimented error handling scenarios such as incorrect file formats all located in **Exceptions** folder
- implimenting Unit Test for **EmployeeService**

#### Frontend (Next.js/React):
- Created React components for the UI: **UploadComponent**, **EmployeeTable**, **JobSummaryTable**, and a view **Employees**.
- **Employees** only render the three components 
- **UploadComponent** provides file upload functionality and triggers the processing of data.
- **EmployeeTable** displays a paginated list of employees, while **JobSummaryTable** shows the average salary for each job title.
- create **api/proccessCSV** file that made the request to back-end and set the results to its states
- implimented validation rules on the file to make sure only csv files are allowed to be sent to back-end

## instructions to run the project:

#### Backend (Java/Spring Boot):
- Ensure Java 17 is installed.
- Run the Spring Boot application containing the **controllers**, **services**, **models**, and **Exceptions**.

#### Frontend (Next.js/React):
- Ensure Node.js v20.10.0 is installed.
- Navigate to the frontend directory.
- Run **npm install** to install dependencies.
- Start the Next.js/React application with **npm run dev**.
- Access the application in your browser at **http://localhost:3000/**.