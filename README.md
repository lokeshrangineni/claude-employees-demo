# Employee Management App

A full-stack CRUD application for managing employees, built with FastAPI and React.

> **Note:** This project was created with [Claude Code](https://claude.ai/code) to explore AI-assisted development.

## Tech Stack

**Backend:**
- Python 3.11+
- FastAPI
- SQLAlchemy (SQLite)
- Pydantic

**Frontend:**
- React 18
- Vite
- Axios

## Features

- Create, read, update, and delete employees
- Search/filter employees by name, email, or department
- Toggle employee active/inactive status
- Responsive design (mobile-friendly)

## Getting Started

### Backend

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```

Backend runs at http://localhost:8000

API docs available at http://localhost:8000/docs

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs at http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/employees` | List all employees |
| GET | `/employees/{id}` | Get employee by ID |
| POST | `/employees` | Create employee |
| PUT | `/employees/{id}` | Update employee |
| DELETE | `/employees/{id}` | Delete employee |

## Project Structure

```
├── app/
│   ├── main.py           # FastAPI app entry point
│   ├── database.py       # Database configuration
│   ├── models/           # Pydantic & SQLAlchemy models
│   ├── routers/          # API routes
│   └── services/         # Business logic
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── components/   # React components
│   │   └── services/     # API client
│   └── ...
└── requirements.txt
```

## License

MIT
