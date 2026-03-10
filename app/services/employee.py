from typing import Optional
from sqlalchemy.orm import Session
from app.models.employee import EmployeeCreate, EmployeeUpdate
from app.models.employee_db import EmployeeDB


def create(db: Session, employee_data: EmployeeCreate) -> EmployeeDB:
    employee = EmployeeDB(**employee_data.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


def get_all(db: Session) -> list[EmployeeDB]:
    return db.query(EmployeeDB).all()


def get_by_id(db: Session, employee_id: int) -> Optional[EmployeeDB]:
    return db.query(EmployeeDB).filter(EmployeeDB.id == employee_id).first()


def update(db: Session, employee_id: int, employee_data: EmployeeUpdate) -> Optional[EmployeeDB]:
    employee = get_by_id(db, employee_id)
    if not employee:
        return None

    update_data = employee_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(employee, key, value)

    db.commit()
    db.refresh(employee)
    return employee


def delete(db: Session, employee_id: int) -> bool:
    employee = get_by_id(db, employee_id)
    if not employee:
        return False
    db.delete(employee)
    db.commit()
    return True
