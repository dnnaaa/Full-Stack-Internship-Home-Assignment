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

## Steps


#### Setting up Node Version Manager (NVM):

- Install Node Version Manager (NVM) to manage Node.js versions.
- Use NVM to switch between Node.js versions based on project requirements.

#### Component Styling with CSS Modules:
- Utilize CSS Modules for component styling.
- Create separate CSS modules for each component to encapsulate styles.
#### Fetching and Displaying Data:

- Implement functionality to upload a CSV file.
- Utilize the fetch API to send the file to a server for processing.
- Retrieve and display employee data and job summary data from the server.
- Update component state to reflect data changes and trigger re-renders.

#### Enhancing Pagination in EmployeeTable:

- Improve pagination in the EmployeeTable component to display page numbers.
- Implement navigation buttons for previous and next pages.
- Enhance pagination to show a limited number of page buttons with ellipsis for better user experience.

#### Backend:
- Implementing a Spring Boot application to handle backend operations.
- Creating a ServiceData class to process CSV files and provide employee-related functionalities.
- Developing a ControllerData class with endpoints to upload CSV files and retrieve employee information, including job title summaries.
- Including unit tests to ensure the functionality and reliability of the backend services.