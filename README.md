## DNA Engineering Full-Stack Assignment

Build a CSV Parser.

## Table of content

- [Prerequisites](#prerequisites)
- [Before We begin](#before-we-begin)
- [Assignment](#assignment)
- [What we expect](#what-we-expect)
- [Bonus points](#bonus-points)
- [My Approch](#My-Approch-&&-Instructions-for-the-Project)

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

# My Approch && Instructions for the Project

## Back End:

### Technologies Used:

- Java
- Spring Boot

### Setup Instructions:

1. Clone the repository.
2. Ensure you have Java 17 installed.
3. Run the backend application: `./mvnw spring-boot:run` or use your preferred method.

### Project Structure:

The project is organized with essential components such as the `Employee` entity class, a service, and controller classes for `CSV parsing`, along with corresponding test classes.

### Data Processing:

The CSV parser service reads from the uploaded CSV file, processes the data, and populates an employee list. Simultaneously, it creates a jobs summary map, including job titles with their average salaries. These data structures are grouped into a `CsvResponse`.

### API Endpoint:

The application exposes an endpoint for users to upload CSV files: `http://localhost:8080/api/resources/uploadFile`. The endpoint returns a `CsvResponse`.

### Testing:

Comprehensive unit tests for both the service and controllers ensure the reliability of the back-end functionality.

### Cross-Origin:

The CrossOrigin annotation is added to allow communication with the Next.js frontend on the specified port.

## Front End:

### Technologies Used:

- Next.js
- React

### Setup Instructions:

1. Ensure you have Node.js v20.10.0 installed.
2. Run the frontend application: `npm install` and then `npm run dev` or use your preferred method.

### Project Structure:

The front-end project is structured to include two additional pages: upload page (containing Interface-1 and Interface-2) and process page (Interface-3).

### User Interface:

#### Interface-1 (Upload Page):

- Provides an upload button for users to select and upload a CSV file.

#### Interface-2 (Upload Page Continued):

- Displays the Process button upon selecting a file.
- Stores the selected CSV file in the `selectedFile` state for future processing.

#### Interface-3 (Process Page):

- Processes the CSV by sending a POST request to the Spring Boot REST API (`http://localhost:8080/api/resources/uploadFile`).
- Populates tables with employee data and job titles along with their average salaries.

## Instructions to Test the App:

1. Start the backend application.
2. Start the Next.js app: `npm run dev`.
3. Access `localhost:3000` in your browser.
4. Click on "Let's Get Started" on the index page.
5. On the upload page, click the upload button and choose the CSV file from `/data/employee.csv`.
6. A success message will appear with the process button.
7. Click on the process button to be redirected to the process page, displaying employee data and job summaries.
