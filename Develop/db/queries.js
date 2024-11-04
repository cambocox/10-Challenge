const pool = require('./connection');

async function viewAllDepartments() {
  const result = await pool.query('SELECT * FROM department;');
  return result.rows;
}

async function viewAllRoles() {
  const result = await pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id;
  `);
  return result.rows;
}

async function viewAllEmployees() {
  const result = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;
  `);
  return result.rows;
}

async function addDepartment(name) {
  await pool.query('INSERT INTO department (name) VALUES ($1);', [name]);
  console.log(`Added department: ${name}`);
}

async function addRole(title, salary, departmentId) {
  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);',
    [title, salary, departmentId]
  );
  console.log(`Added role: ${title}`);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);',
    [firstName, lastName, roleId, managerId]
  );
  console.log(`Added employee: ${firstName} ${lastName}`);
}

async function updateEmployeeRole(employeeId, newRoleId) {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2;', [newRoleId, employeeId]);
  console.log(`Updated employee ${employeeId} to role ${newRoleId}`);
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};