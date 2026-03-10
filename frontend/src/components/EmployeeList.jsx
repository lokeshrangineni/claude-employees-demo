export default function EmployeeList({ employees, onEdit, onDelete, onToggleActive }) {
  if (employees.length === 0) {
    return <p className="no-data">No employees found. Add one to get started!</p>;
  }

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id} className={!employee.is_active ? 'inactive-row' : ''}>
            <td data-label="ID">{employee.id}</td>
            <td data-label="First Name">{employee.first_name}</td>
            <td data-label="Last Name">{employee.last_name}</td>
            <td data-label="Email">{employee.email}</td>
            <td data-label="Department">{employee.department}</td>
            <td data-label="Salary">${employee.salary.toLocaleString()}</td>
            <td data-label="Status">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={employee.is_active}
                  onChange={() => onToggleActive(employee.id, !employee.is_active)}
                />
                <span className="toggle-slider"></span>
              </label>
            </td>
            <td data-label="">
              <button className="btn-edit" onClick={() => onEdit(employee)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(employee.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
