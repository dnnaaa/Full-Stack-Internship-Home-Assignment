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


# Employee Data Processing Project

## Overview
This project aims to provide a simple web-based application for parsing and analyzing employee data from CSV files. The backend is built using Spring Boot, and the frontend is developed using Next.js/React.

## Prerequisites
Make sure you have the following installed on your system:

- Java 17
- Node.js v20.10.0

## Project Structure
The backend is structured around a Spring Boot application with the following key components:

## Employee Class:
- Defines the data structure for an employee, including fields such as id, name, jobTitle, and salary.

## CSVParser Class:
- Provides functionality to parse CSV files containing employee data.
- Calculates average salary for each job title.

## CsvController Class:
- Defines REST endpoints for file parsing and calculating average salaries.
- Uses CSVParser for processing.

## Instructions to Run Backend
- Clone the repository.
- Navigate to the backend directory.
- Run the Spring Boot application.

# Frontend (Next.js/React)

## Project Structure
The frontend is built using Next.js and React. The components include:

## FileUpload Component:

- Provides an interface to upload CSV files.

## ResultsTable Component:

- Displays a paginated list of employees and the average salary for each job title.

## Instructions to Run Frontend

- Navigate to the frontend directory.
- Install dependencies using **npm install**.
- Run the application using **npm run dev**.

# Usage

- Open your web browser and go to http://localhost:3000.
- Use Interface-1 to upload a CSV file.
- Interface-2 will display a Process button after choosing a file.
- Click the Process button to see Interface-3 with two tables displaying employee information and job title summaries.