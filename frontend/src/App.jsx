import { useState, useEffect } from 'react';
import { employeeService } from './services/employeeService';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const search = searchTerm.toLowerCase();
    return (
      emp.first_name.toLowerCase().includes(search) ||
      emp.last_name.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search) ||
      emp.department.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAll();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to load employees. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        loadEmployees();
      } catch (err) {
        setError('Failed to delete employee');
      }
    }
  };

  const handleSave = async (employeeData) => {
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, employeeData);
      } else {
        await employeeService.create(employeeData);
      }
      setShowForm(false);
      setEditingEmployee(null);
      loadEmployees();
    } catch (err) {
      setError('Failed to save employee');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await employeeService.update(id, { is_active: isActive });
      loadEmployees();
    } catch (err) {
      setError('Failed to update employee status');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Employee Management</h1>
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        
        {!showForm && (
          <div className="toolbar">
            <button className="btn-primary" onClick={handleAdd}>
              Add Employee
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {showForm ? (
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {searchTerm && filteredEmployees.length > 0 && (
              <div className="search-results-info">
                Showing {filteredEmployees.length} of {employees.length} employees
              </div>
            )}
            {searchTerm && filteredEmployees.length === 0 && employees.length > 0 ? (
              <div className="no-results">
                No employees match "{searchTerm}"
              </div>
            ) : (
              <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
