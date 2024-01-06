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

## MY EXPLANATION
- I have used Spring Boot for the backend and Next.js for the frontend.
- to run the backend, you need to run the main method in the CsvParserApplication class.
- the backend is running on port 8080.
- the frontend is running on port 3000.
- to run the frontend, you need to run the following commands:
    - npm install
    - npm run dev
- I have used the following libraries:
- Backend:
    - lombok: to generate getters and setters
    - spring-boot-starter-web: to create a spring boot application
    - spring-boot-starter-test: to create unit tests
- Frontend : 
    - axios: to make http requests
    - react-bootstrap: to use bootstrap components
    - react-dropzone: to create a dropzone
    - react-icons: to use icons
    - react-paginate: to create a pagination
    - react-table: to create a table
    - react-toastify: to create a toast
    - sass: to use sass
    - typescript: to use typescript  
