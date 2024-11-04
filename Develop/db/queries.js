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

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees };