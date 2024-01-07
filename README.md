# Full Stack Internship Homework 

## overview 

This repository contains the code for the full stack lab homework. This task involves building a system that processes employee data from  CSV files, provides a user interface for uploading files, and displays the processing results.  
## Features 

### Backend (Java/Spring Boot) 

#### CSV analysis 

- The backend provides services to parse employee data from  CSV files. - "CsvParserService" reads the CSV file, extracts employee information, and calculates the average salary for each position. 
#### API endpoint 

– The backend provides a RESTful API endpoint (“/test/parse-csv”) to trigger the CSV parsing process.  - The endpoint returns a JSON object containing a list of employees and the average salary for each position. 
#### Data model 

- Employee class represents an employee with attributes such as ID, name,  title, salary, etc. - "CsvParserService" processes and calculates average salary based on  employee data.  
### Frontend (Next.js/React) 

#### Interface-1:  File upload 

- The first interface provides a simple  interface for uploading  CSV files. - Contains an "upload" button and handles file selection.  #### Interface 2: Process File 

- After uploading the file, you will be able to access the second interface. - The uploaded file will be displayed and  a "Process" button will be displayed to trigger the backend processing. 
 #### Interface-3: Show results 

- The third interface displays two tables. 
- **Table 1:** Employee Information - Displays a paginated list of employees.  - **Table 2:** Job Summary - Shows the average salary for each position. 
### Frontend styles 

- Frontend components are designed using CSS to ensure a clean and user-friendly interface.  - Styles include containers, upload buttons, processing buttons, and table styles. 
 ## Use 

### Backend 

– Verify that Java and Maven are installed.  - Go to the "backend" directory.  - Run "mvn spring-boot:run" to start the backend server. 
 ### front end 

- Go to the "Frontend" directory.  - Run "npm install" to install dependencies.  - Run "npm run dev" to start the Next.js development server. 
 Open your browser and  access the application by visiting "http://localhost:3000". 
＃＃Bonus points 

- Implemented CSV parsing without using  external libraries. - Used design patterns in  backend implementation.  - Handled CORS in the backend to allow requests from the Next.js frontend. 
 ## remarks 

- Configure paths and endpoints according to your project structure and requirements.