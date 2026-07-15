# 📋 Todo Management System

A modern Todo Management System built with **Spring Boot** and **Next.js**, providing task management, user authentication, dashboard statistics, calendar view, and profile management.

---

## 🚀 Features
### 🔐 Authentication
- Login
- Register
- JWT Authentication
- Protected Routes
- Logout

---

### 📊 Dashboard
- Overview statistics
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
  - High Priority Tasks
- Interactive Calendar
- Weekly / Monthly Calendar View
- Jump to Today
- Upcoming Tasks
- Tasks of Selected Date

---

### ✅ Todo Management
- Create Todo
- Update Todo
- Delete Todo
- View Todo Details
- Mark Complete
- Search Todo
- Filter by
  - Title
  - Status
  - Priority
- Sort by
  - Created Time
  - Title
  - Priority
  - Due Date
- Pagination

---

### 👤 Profile
- View User Information
- Update Full Name
- Task Statistics
  - Total
  - Completed
  - Pending
  - Overdue

---

## 🛠 Tech Stack
### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Base UI
- TanStack Query
- React Hook Form
- Axios
- Sonner
- Lucide Icons
---
### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Maven
---


## ⚙️ Installation

### Clone

```bash
git clone https://github.com/HongNhienTran/MiniProj_TodoApp.git
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:3000
```

---

### Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend

```
http://localhost:8080
```

## 📄 API Documentation (Swagger)
The backend provides interactive API documentation using **Swagger UI (OpenAPI 3)**.

After starting the Spring Boot application, you can access:
### Swagger UI
```
http://localhost:8080/swagger-ui/index.html
```
or
```
http://localhost:8080/swagger-ui.html
```
### OpenAPI JSON
```
http://localhost:8080/v3/api-docs
```
Swagger provides:
- View all REST APIs
- API request/response schemas
- Authentication testing
- Execute API requests directly from the browser
- API documentation for frontend development

