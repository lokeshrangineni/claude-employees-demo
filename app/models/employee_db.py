from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database import Base


class EmployeeDB(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    department = Column(String, nullable=False)
    salary = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
