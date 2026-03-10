import { useState, useEffect } from 'react';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  department: '',
  salary: '',
  is_active: true
};

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        department: employee.department,
        salary: employee.salary,
        is_active: employee.is_active
      });
    } else {
      setFormData(initialFormState);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      salary: parseFloat(formData.salary),
      is_active: formData.is_active
    });
  };

  return (
    <div className="form-container">
      <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group form-group-status">
          <label>Status</label>
          <div className="status-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="status-label">{formData.is_active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {employee ? 'Update' : 'Create'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
