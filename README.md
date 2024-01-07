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



# Approach

## Back-End

- Used Postgres Database to store the employees data .     
-**Run Instructions ** : Run the potsgres dabatase service , run the back-end application , and to run the front-end application : npm install and npm run dev
the app will start on port 3000 .      

- ** Package Utils ** : Contains The class FileReader , I used this class to read by line a file of any type , the resulting List of lines is then used by the service layer to parse it  (In our case the CSV parsing) .    
I have implemented 2 methods , one to read a file stored locally (it was for the intial test) , and the other one to read a file that has been serialized .
```java 
/*
     Helper function to read file stored locally for test purposes
     */
    public static List<String> readFileByLine(String fileLocation) {

        try {
            Path chemin = Path.of(fileLocation);
           return Files.lines(chemin).toList();

        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /*
    Helper function to read the file that was serialized in the request body
    */
    public static List<String> readSentFileByLine(InputStream fileContent) {
        try {
            BufferedReader buffer = new BufferedReader(new InputStreamReader(fileContent));
            return buffer.lines().toList();
        }catch (UncheckedIOException e) {
            throw  new RuntimeException(e) ;
        }
    }
```

-**Services** : This Package contains an interface and its implementation.    A generic interface that handles parsing and processing , the implementation is the CsvService class which use the Employee class to hold the data .
```java
public interface CsvService<T> {
    /*
    I used this method to first test reading a local file
     */
    List<T> processLocalFile(String path);

    /*
     This is the method that will be used to process the file sent by the frontend app
     */
    List<T> processUploadedFile(InputStream content);


    /*
      Calculate  the average salary for each job title.
     */
    HashMap<String, Double> averageSalaryForEachJobTitle(List<T> objects);


    /*
     Stores all the CSV Data
     */
    void save(List<T> objects);

    List<T> getAll();
}
```
```java
/*
    Converts a line in the csv file to an employee object
     */
    private Employee csvLineToEmployee(String line ) {
        String[] values = line.split(",");
        return Employee.builder()
                .id(Integer.parseInt(values[0]))
                .employee_name(values[1])
                .job_title(values[2])
                .salary(Double.parseDouble(values[3]))
                .build();

    }
```
-**Controller and DTO** : A RestController with 2 endpoints :    
"/process-csv" :  handles the processing of the csv file and when it is done , the content of the file gets persisted to the database .
"/get-data"    :  Returns the database data if it exists to the client.    
```java
@PostMapping("/process-csv")
    public ResponseEntity<CustomResponse> processCSV(@RequestParam("csv_file") MultipartFile file) throws IOException {
        List<Employee> employees = service.processUploadedFile(file.getInputStream());
        HashMap<String,Double> summary = service.averageSalaryForEachJobTitle(employees);
        service.save(employees);
        CustomResponse response =CustomResponse.builder()
                .employees(employees)
                .summary(summary)
                .message("Your CSV file has been processed")
                .build();

        return ResponseEntity.ok(response);
    }
```

--* Unit Tests * : Wrote unit test  for the service layer .
![test-assignements](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/ae9bbab9-3a8c-4e21-8b29-b2b7b563813f)



###Front-End :
--*Service Layer* : Contains the code that calls the spring-boot endpoints .
```javascript
export const csvParserApi = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)

export const saveCSV = (formData) => {
   return  csvParserApi.post('/process-csv' ,formData , {
        headers : {
            "content-type" : "multipart/form-data"
        }
    }) ;
}

 export const getData = () => {
     return csvParserApi.get('/get-data');
 }
```

--*Components folder* : For reusability and to have a more readable code.      
![compoenent-assignement](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/36c43a85-57a4-4af0-b38a-df18e046f254)




### DEMO :
--- When the back-end app is off :
![assignement-1](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/1f9e0bb6-265c-41fb-8c0d-2b797252f20d)

--- Interface 1 :
![assignement-2](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/5c8a335c-3b2b-4ac9-bb81-02cb31e6c707)

--Interface 2 :
![assignement-3](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/9ce301f0-6d50-4401-a2cd-739e15a3b415)

-- Interface 3 :
![assignement-4](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/10239de6-4b1b-47a0-a087-be17e24deb8c)
![assignement-5](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/44009960-efd1-431f-a790-9edb891f6a5f)
![assignement-6](https://github.com/Oussafadi/Full-Stack-Internship-Home-Assignment/assets/96580119/3c0a8860-2456-4743-a0b9-0b8f85b079f8)





