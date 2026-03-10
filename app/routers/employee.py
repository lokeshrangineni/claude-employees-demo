from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.employee import Employee, EmployeeCreate, EmployeeUpdate
from app.services import employee as employee_service
from app.database import get_db

router = APIRouter(prefix="/employees", tags=["employees"])


@router.post("", response_model=Employee, status_code=201)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return employee_service.create(db, employee)


@router.get("", response_model=list[Employee])
def get_all_employees(db: Session = Depends(get_db)):
    return employee_service.get_all(db)


@router.get("/{employee_id}", response_model=Employee)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = employee_service.get_by_id(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@router.put("/{employee_id}", response_model=Employee)
def update_employee(employee_id: int, employee_data: EmployeeUpdate, db: Session = Depends(get_db)):
    employee = employee_service.update(db, employee_id, employee_data)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@router.delete("/{employee_id}", status_code=204)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    if not employee_service.delete(db, employee_id):
        raise HTTPException(status_code=404, detail="Employee not found")
