<<<<<<< HEAD

---
# 🚀 HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.

The system allows an admin to:

- Manage employee records
- Track daily attendance
- View real-time dashboard summary

This project demonstrates end-to-end full-stack development including:

- REST API design
- Database modeling
- Server-side validation
- Error handling
- Professional UI development
- Production deployment

---

## 🌐 Live Application

### 🔹 Frontend (Vercel)
👉 https://hrms-lite-eight-sigma.vercel.app/

### 🔹 Backend API (Render)
👉 https://hrms-lite-backend-qmue.onrender.com/api/

---

## 🛠 Tech Stack

### 🔹 Backend
- Python
- Django
- Django REST Framework
- Gunicorn (Production WSGI Server)
- PostgreSQL (Render Production DB)
- dj-database-url
- psycopg2

### 🔹 Frontend
- React (Vite)
- Axios
- React Router
- Custom Professional UI Theme

### 🔹 Database
- SQLite (Local Development)
- PostgreSQL (Production on Render)

### 🔹 Deployment
- Backend: Render
- Frontend: Vercel
- Database: Render PostgreSQL

---

## ✨ Features Implemented

---

### 1️⃣ Employee Management

- Add new employee
- View employee list
- Delete employee
- Unique Employee ID validation
- Email format validation
- Duplicate employee prevention
- Server-side validation
- Meaningful error messages

---

### 2️⃣ Attendance Management

- Mark attendance (Present / Absent)
- Select attendance date
- View attendance records
- Prevent duplicate attendance for same employee & date
- Custom validation message:
  > "Attendance is already marked for this employee on this date."

---

### 3️⃣ Dashboard Summary

- Total Employees
- Total Attendance Records
- Present Today
- Absent Today
- Clean summary cards UI

---

### 4️⃣ Filtering Features 

- Filter employees by name
- Filter employees by department
- Filter attendance by date
- Filter attendance by employee

---


## 🧾 Server-Side Validation & Error Handling

The application implements:

- Required field validation
- Valid email format validation
- Duplicate employee ID handling
- Duplicate attendance handling
- Proper HTTP status codes (200, 201, 400, 404)
- Meaningful API error messages
- Graceful frontend error display

---

## 📂 Project Structure

```

hrms-lite/
│
├── backend/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   └── hr/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── migrations/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── api.js
│   │   └── App.jsx
│
├── requirements.txt
└── README.md

````

---

## 🔧 How to Run Locally

---

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
````

Backend runs at:

```
http://127.0.0.1:8000/
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

---




## 👩‍💻 Author

**Asmita Gupta**
Full Stack Developer
GitHub: [https://github.com/Asmitagupta07](https://github.com/Asmitagupta07)

---

## ✅ Deployment Status

| Service        | Status              |
| -------------- | ------------------- |
| Backend        | Live on Render      |
| Frontend       | Live on Vercel      |
| Database       | PostgreSQL (Render) |
| API            | Fully functional    |
| Validation     | Implemented         |
| Error Handling | Implemented         |




---



=======
# hrms
>>>>>>> 627888762fa7cdfa6247cba7cc4bd5dcae81c495
