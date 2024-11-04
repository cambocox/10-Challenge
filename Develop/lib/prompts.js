const inquirer = require('inquirer');

async function mainMenu() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    }
  ]);
}

async function addDepartmentPrompt() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    },
  ]);
}

async function addRolePrompt(departments) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter the name of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for this role:',
      choices: departments.map(dept => ({ name: dept.name, value: dept.id })),
    },
  ]);
}

async function addEmployeePrompt(roles, employees) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for this employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the manager for this employee (optional):',
      choices: [{ name: 'None', value: null }].concat(
        employees.map(emp => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        }))
      ),
    },
  ]);
}

async function updateEmployeeRolePrompt(employees, roles) {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee whose role you want to update:',
      choices: employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      })),
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'Select the new role for this employee:',
      choices: roles.map(role => ({ name: role.title, value: role.id })),
    },
  ]);
}

module.exports = { mainMenu, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeeRolePrompt };