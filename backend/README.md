# **DNA Engineering Internship Home Assignment**

---

## **Backend Requirements**

### 1. MVN Installation

https://maven.apache.org/download.cgi > Binary zip archive
Extract and Add the repository "bin" to PATH

---

### 2. Project dependances Installation

mvn clean install
mvn spring-boot:run

project start on http://localhost:8080 with the consol-messages:
"
Tomcat started on port(s): 8080 (http)
Started BackendApplication in 3.456 seconds (JVM running for 4.567)
"

---

### 3. API Endpoints Test with POSTMAN

- `POST /jobs`: Create a new job post.
- `GET /jobs`: Fetch all job posts with specific attributes (`id`, `title`, `location`, `salary`).
- `GET /jobs/{id}`: Fetch details of a specific job post.
- `PUT /jobs/{id}`: Update an existing job post.
- `DELETE /jobs/{id}`: Delete a job post.

---

### 3. Database

- **PostgreSQL**.

---
