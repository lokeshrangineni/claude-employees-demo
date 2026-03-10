from pydantic import BaseModel
from typing import Optional


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    department: str
    salary: float


class EmployeeCreate(EmployeeBase):
    is_active: bool = True


class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    department: Optional[str] = None
    salary: Optional[float] = None
    is_active: Optional[bool] = None


class Employee(EmployeeBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True
