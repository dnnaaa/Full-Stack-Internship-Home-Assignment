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

# My Approach and instructions to run my project
### Explaining the backend code structure
The backend project contains the following packages, each class and methods in these packages is well commented for the explanation purpose
- ma.dnaengineering.backend.Controllers: That contains the web controllers
- ma.dnaengineering.backend.services: Contains the class responsible for processing the uploaded file
- ma.dnaengineering.backend.beans: Contains a single class FileData that has as its attributes information like the name of employees, job title and so on
The unit test is performed is the ControllerTest class, the code test if the method for processing the file is working as expected
### Explaining the frontend project structure
The directory named components, under the source directory, contains all the components used to make the interface. These components have comprehensive names
The MainUI component is then rendered with the index.js file
### Running the project
In to run the java project, we have just to execute the following command :java -jar [where_the_project_is_located]\Full-Stack-Internship-Home-Assignment\backend\target\backend.jar
We should have java on in the environment variables path

To run the frontend project, we have just to run the following commands in a terminal:
- cd [where_the_project_is_located]\Full-Stack-Internship-Home-Assignment\frontend
- npm run dev
Still we assume that you have Node environment in your computer

If all the server are running, you can go and hint http://localhost:3000 in your web browser
You should be able to see a button for uploading a file