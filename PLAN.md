# Employee CRUD Application Plan

## Overview
Full-stack application with FastAPI backend and React frontend for managing employees.

---

## Backend (FastAPI)

### 1. Models (`app/models/employee.py`)
- `Employee` - Pydantic model with fields:
  - `id`: int (auto-generated)
  - `first_name`: str
  - `last_name`: str
  - `email`: str
  - `department`: str
  - `salary`: float
- `EmployeeCreate` - for creation (without id)
- `EmployeeUpdate` - for partial updates (all fields optional)

### 2. Service Layer (`app/services/employee.py`)
- In-memory storage (dict) for simplicity
- CRUD functions: `create`, `get_all`, `get_by_id`, `update`, `delete`

### 3. Router (`app/routers/employee.py`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/employees` | Create employee |
| GET | `/employees` | List all employees |
| GET | `/employees/{id}` | Get employee by ID |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

### 4. Main App (`app/main.py`)
- FastAPI app with CORS middleware (for React)
- Include employee router

---

## Frontend (React + Vite)

### 1. Setup
- Create React app using Vite in `frontend/` directory
- Install axios for API calls

### 2. Components
- `App.jsx` - Main layout
- `EmployeeList.jsx` - Table displaying all employees
- `EmployeeForm.jsx` - Form for create/edit
- `EmployeeService.js` - API client

### 3. Features
- View all employees in a table
- Add new employee (modal/form)
- Edit existing employee
- Delete employee with confirmation

---

## Project Structure

```
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── employee.py
│   ├── routers/
│   │   ├── __init__.py
│   │   └── employee.py
│   └── services/
│       ├── __init__.py
│       └── employee.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── EmployeeList.jsx
│   │   │   └── EmployeeForm.jsx
│   │   └── services/
│   │       └── employeeService.js
│   └── ...
├── requirements.txt
└── tests/
    └── test_employee.py
```

---

## Running the Application

### Backend
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation
Once the backend is running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc