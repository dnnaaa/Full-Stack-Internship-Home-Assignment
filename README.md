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

## My Solution

### Backend
- **Storage Decision**: Initially, I decided to store the CSV file in the data folder.
- **DTO Creation**: Next, I created DTOs to be returned to users and for various requests.
- **Service Creation**: I created a service for parsing the CSV file, which handles the extraction of data and conversion into DTOs.
- **Exception Handling**: I implemented exception handling for cases such as file not found, file type not supported, and file already existing.
- **Global Exception Handling**: To manage exceptions across the application, I utilized Spring's `@ControllerAdvice` to centralize exception handling and provide consistent error responses.
- **CSV Extraction Tool**: I then developed a tool to extract the CSV using buffer and input streams for storage and splitting by delimiter. This allowed me to parse the uploaded CSV file and return the corresponding DTO as my structure.
- **DTOs**: I have three DTOs: one for employees, one for average salaries, and one that combines the two for easier frontend display.
- **Average Salary Calculation**: To calculate the average salary for each job, I used Java's collection functions to group by job and calculate the average.
- **Testing**: Finally, I implemented tests for each method in my service.

### Frontend
- **Component-Based Interface**: For the frontend, I divided the main interface into multiple components.
- **Axios for API Requests**: I used Axios to simplify API requests.
- **Custom Hooks**: For each operation, I created a custom hook to retrieve and send the required data. This allowed me to manage loading and errors effectively.

### Running the Project
- **Backend:** To run the backend, ensure that the Spring port matches the one used in the frontend API configuration. Then, simply run the SpringBootApplication.
- **Frontend:** For the frontend, navigate to the frontend directory. Ensure that the useAxios hook in the hooks folder contains your backend URL. Then, run npm install followed by npm run dev.