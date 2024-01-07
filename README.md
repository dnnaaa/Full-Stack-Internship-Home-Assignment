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

# CSV Parser Project

## Approach

### Backend

For the backend, I used a Spring Boot application written in Java with the following key components:

- `ReportController`: Receives the CSV file upload as a multipart request, passes the file to the CSV parser service to parse it to `Employee` POJOs, then calculates the average salaries by title and returns a JSON `ReportResponse` with the results.

- `CsvParserService`: Parses a CSV file input stream row by row into a list of `Employee` objects without using any CSV library.

- `EmployeeRepository`: Saves parsed Employees to database to enable reuse across requests. Employees were modeled as JPA entities.  

### Frontend   

The frontend was implemented using Next.js and React. Key pages & components:

- **pages/index.js** - Allow file upload and display result tables after processing  
- **components/FileUploadForm** - UI for user to upload a CSV file.
- **components/EmployeeTable and SalaryStatsTable** - Display processed backend results   

The `FileUploadForm` submits the CSV file to the backend API, then displays the returned employees and salary statistics.

## Running Instructions  

### Backend

```bash
# compile   
mvn package  

# run   
java -jar target/csv-parser.jar
```
### Frontend
```bash
# install dependencies
npm install  

# run  
npm run dev
```
## Configuration
Some application configuration is located in the Next.js .env.local file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_ITEMSPERPAGE=10
```
- **NEXT_PUBLIC_API_URL:** The backend API URL. Modify to match your deployment URL.
- **NEXT_PUBLIC_ITEMSPERPAGE:** Sets the pagination size for the employee results.

Backend runs on port 8080 while frontend runs on port 3000 by default.

Some ways this could be improved in the future:

- Add Docker config to containerize backend/frontend
- Use React query for fetching data on frontend
- Add authentication

  
