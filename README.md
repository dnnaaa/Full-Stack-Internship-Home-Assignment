## DNA Engineering Full-Stack Assignment by WAHSOUSSE WISSAL

### Goal

The goal of this assignment is to create a CSV parser using Spring Boot and build a user interface to display results using Next.js.

## Table of content


- [Backend (CSV Parser)](#backend-csv-parser)
  - [Configuration](#configuration)
  - [Database Setup](#database-setup)
  - [Entities](#entities)
  - [Repositories](#repositories)
  - [Service](#service)
  - [Controller](#controller)
- [Frontend](#frontend)
  - [Setup and Configuration](#setupANDconfiguration)
  - [Tailwind CSS styling](#tailwind_css)
  - [the UI](#ui)
- [Developed by](#developed-by)



## Backend (CSV Parser)

### Configuration
After cloning the project, I navigate to the `pom.xml` file and By default, the project is configured to use PostgreSQL as the database. But I don't have it locally, so I change it to MySQL.

### Database Setup
1. I Create a MySQL database named "csvparser."
2. I Configure the database connection in the `application.properties` file.

### Entities
I Create an `entities` package that contains:
- `Employee`: A class annotated with `@Entity` representing the data structure stored in the database. And the database schema is automatically generated based on the entities.
- `MyOwnCsvparser`: A class customizing the CSV parser to process and extract data from the uploaded CSV file. without using an external library.

### Repositories
I Create a `repositories` package containing the `EmployeeRepository` interface which extends Spring Data JPA's `JpaRepository` for database operations on the `Employee` entity.

### Service
I Create a `service` package containing the `csvService` class that utilizes the parser of `MyOwnCsvparser` to process the data.

### Controller
I Create a `Controller` package containing `myController`that define:
- The `/api/csv/upload`  FILE UPLOAD ENDPOINT  handles file uploads. It takes a MultipartFile as a parameter, which is the uploaded CSV file. It then passes the input stream of the file to the csvservice for processing and saving.
- the `/api/csv/employees` endpoint. It retrieves all employees from the database using the csvservice and returns them in the response body.
- the `/api/csv/jobsSummary` endpoint. It retrieves a summary of jobs, specifically the average salary for each job title. The result is obtained from the csvservice and returned in the response body.
- CORS is configured to allow requests from `http://localhost:3000`, assuming the frontend runs on this domain.


## Frontend

#### setup and configuration
   - I Ensure that I have Node.js installed (v20.10.0).
   - I Navigate to the `frontend` directory and run `npm install` to install the required dependencies.
   - I run `npm run dev`.


#### Tailwind CSS styling
   - Tailwind CSS is used for styling. The configuration can be found in the `tailwind.config.js` file.
   - Styles are applied using utility classes in JSX for a clean and maintainable styling approach.


### the UI 

I Respect the following design flow:

![Frontend interfaces](./static/interfaces.png)

 In the `index.js` file:
 - Users can upload a CSV file using the file input element.
 - When a file is selected, it triggers the handleFileChange function, which sets the selected file in the component state and makes the "process" button visible.
 - Clicking the "Process" button triggers the handleProcessClick function.
 - This function sends a POST request to the backend at http://localhost:8080/api/csv/upload with the selected file using Axios.
 - After successfully processing the file on the backend, it fetches the processed data -the Employee Information- and job summary from the backend endpoints (http://localhost:8080/api/csv/employees and http://localhost:8080/api/csv/jobsSummary, respectively).
 - The Employee Information  is displayed in a paginated table (paginatedData) with columns for ID, Employee Name, Job Title, and Salary.
 - Pagination controls (Previous and Next buttons) allow users to navigate through the data.
 - The job summary, containing the average salary for each job title, is displayed in a separate table when the data processing is successful.
 - The job summary table is hidden by default and becomes visible (showJobsSummary) after processing the file.

 ## Developed by
**WAHSOUSSE WISSAL**
**wissalwahsousse@gmail.com**

