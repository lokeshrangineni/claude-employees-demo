from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import employee
from app.database import engine, SessionLocal
from app.models.employee_db import Base, EmployeeDB

app = FastAPI(title="Employee API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)


def init_sample_data():
    db = SessionLocal()
    try:
        if db.query(EmployeeDB).count() == 0:
            sample_employees = [
                EmployeeDB(
                    first_name="John",
                    last_name="Smith",
                    email="john.smith@company.com",
                    department="Engineering",
                    salary=95000.00,
                    is_active=True
                ),
                EmployeeDB(
                    first_name="Sarah",
                    last_name="Johnson",
                    email="sarah.johnson@company.com",
                    department="Marketing",
                    salary=78000.00,
                    is_active=True
                ),
                EmployeeDB(
                    first_name="Michael",
                    last_name="Williams",
                    email="michael.williams@company.com",
                    department="Engineering",
                    salary=105000.00,
                    is_active=True
                ),
                EmployeeDB(
                    first_name="Emily",
                    last_name="Brown",
                    email="emily.brown@company.com",
                    department="Human Resources",
                    salary=65000.00,
                    is_active=False
                ),
                EmployeeDB(
                    first_name="David",
                    last_name="Garcia",
                    email="david.garcia@company.com",
                    department="Finance",
                    salary=88000.00,
                    is_active=True
                ),
                EmployeeDB(
                    first_name="Jessica",
                    last_name="Martinez",
                    email="jessica.martinez@company.com",
                    department="Engineering",
                    salary=92000.00,
                    is_active=True
                ),
                EmployeeDB(
                    first_name="Robert",
                    last_name="Anderson",
                    email="robert.anderson@company.com",
                    department="Sales",
                    salary=72000.00,
                    is_active=False
                ),
                EmployeeDB(
                    first_name="Amanda",
                    last_name="Taylor",
                    email="amanda.taylor@company.com",
                    department="Marketing",
                    salary=81000.00,
                    is_active=True
                ),
            ]
            db.add_all(sample_employees)
            db.commit()
            print("Sample data loaded successfully!")
    finally:
        db.close()


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    init_sample_data()


@app.get("/")
def root():
    return {"message": "Employee API is running"}
