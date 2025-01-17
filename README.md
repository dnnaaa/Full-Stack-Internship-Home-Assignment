# **DNA Engineering Internship Home Assignment**

---

## **Table of Contents**
1. [Objective](#objective)  
2. [Prerequisites](#prerequisites)  
3. [Assignment Overview](#assignment-overview)  
4. [Backend Requirements](#backend-requirements)  
5. [Frontend Requirements](#frontend-requirements)  
6. [Process Flow](#process-flow)  
7. [Submission Process](#submission-process)  
8. [Optional Enhancements](#optional-enhancements)

---

## **Objective**
Build a **Job Management System** using **React.js** or **Next.js** for the frontend and **Spring Boot 2 or 3** for the backend. The system should allow users to create, view, update, and delete job posts. This assignment evaluates your ability to structure a full-stack application, follow best practices, and create a functional UI/UX.

---

## **Prerequisites**
- **Backend**:  
  - Java 17  
  - Spring Boot 2.5+ (3.0 preferred)  
  - MySQL or PostgreSQL  

- **Frontend**:  
  - Node.js 20+  
  - React.js 18+ or Next.js 14+  

- **Optional UI Libraries**:  
  - Material UI (recommended)  
  - Tailwind CSS (optional for styling)  

---

## **Assignment Overview**
You will build a **Job Management System** with the following features:
1. **Backend**: A REST API for managing job posts.  
2. **Frontend**: A responsive web interface for interacting with the API.  
3. **Database**: Store job posts in a relational database (**MySQL** or **PostgreSQL**).

---

## **Backend Requirements**

### 1. Entity Architecture
- **Job**:  
  - `id`: Primary Key (Auto Increment)  
  - `title`: String, required  
  - `description`: Text, required  
  - `location`: String, optional  
  - `salary`: Decimal, optional  
  - `postedAt`: Timestamp, auto-generated  
  - `updatedAt`: Timestamp, auto-generated  

---

### 2. API Endpoints
- `POST /jobs`: Create a new job post.  
- `GET /jobs`: Fetch all job posts with specific attributes (`id`, `title`, `location`, `salary`).  
- `GET /jobs/{id}`: Fetch details of a specific job post.  
- `PUT /jobs/{id}`: Update an existing job post.  
- `DELETE /jobs/{id}`: Delete a job post.  

---

### 3. Database
- Use **MySQL** or **PostgreSQL**.  
- Properly index fields like `id` for performance.  

---

### 4. Best Practices
- Implement **controllers**, **services**, and **repositories** for clean architecture.  
- Validate required fields using annotations like `@NotNull`.  
- Handle exceptions gracefully, returning appropriate HTTP status codes (e.g., `404` for not found).  

---

## **Frontend Requirements**

### 1. Pages and Components
- **Job List Page**:  
  - Displays a table of job posts with columns: `Title`, `Location`, and `Salary`.  
  - Includes options to edit or delete a job.  
  - Provides a button to navigate to the Add Job Page.  

- **Add/Edit Job Page**:  
  - Form to create or edit a job post.  
  - Fields: `Title`, `Description`, `Location`, and `Salary`.  

---

### 2. State Management
- Use **`useState`** and **`useEffect`** for local state management.  
- Structure state management between a **main component** (e.g., `JobListPage`) and **sub-components** (e.g., `JobTable`, `JobForm`).  

**Example**:  
- The `JobListPage` fetches job data and passes it to `JobTable`.  
- The `JobForm` handles form submission and updates the parent component.

---

### 3. UI Design
- Use **Material UI** for consistent and professional styling:  
  - Table for displaying jobs.  
  - Form fields for adding/editing jobs.  

- Optionally, use **Tailwind CSS** for additional styling enhancements.  

---

### 4. Optional Features
- **Responsive Design**: Use Grid or Flexbox to ensure the application works well on both desktop and mobile devices.  

---

## **Process Flow**

1. **User lands on the Job List Page**.  
   - Jobs are fetched from the backend (`GET /jobs`) and displayed in a table.  

2. **Jobs are fetched from the backend (GET /jobs) and displayed in a table**.  
   - ![1](https://github.com/user-attachments/assets/f2059043-8176-4038-963d-a14009f402f6)

   **Diagram Explanation**:  
   This diagram shows the flow when the "Add Job" button is clicked. It transitions the user to a blank form for creating a new job, with the submission triggering a `POST /jobs` API request.  

3. **Clicking "Add Job" navigates to the Add/Edit Job Page**.  

4. Submitting the form sends data to POST /jobs (for new jobs) or PUT /jobs/{id} (for updates).

  - ![2](https://github.com/user-attachments/assets/7aec2251-55bc-48ff-be03-3d7170787c99)

   **Diagram Explanation**:  
   This diagram shows the flow when the "Add Job" button is clicked. It transitions the user to a blank form for creating a new job, with the submission triggering a `POST /jobs` API request.
   Then the flow for editing an existing job. It starts with fetching job details `GET /jobs/{id}` and then displays the data in a pre-filled form for updates, followed by a `PUT /jobs/{id}` API call upon submission.


5. After successful submission, the user is redirected back to the Job List Page
---

## **Submission Process**
1. Fork the provided GitHub repository containing the assignment instructions.  
2. Clone the repository to your local machine.  
3. Complete the assignment by modifying the code in the repository.  
4. Push your changes to your forked repository.  
5. Submit a pull request to the original repository.  

---

## **Optional Enhancements**
For candidates with more time or experience, the following can be implemented for bonus points:  
1. Use **Tailwind CSS** for styling enhancements alongside Material UI.  
2. Improve user feedback with toast notifications or modals.  
3. Add additional validations or optional fields.  
4. Provide basic responsive design.  
