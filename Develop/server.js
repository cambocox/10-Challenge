const { mainMenu, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeeRolePrompt } = require('./lib/prompts');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/queries');

async function init() {
  let shouldContinue = true;

  while (shouldContinue) {
    const { action } = await mainMenu();

    switch (action) {
      case 'View all departments':
        console.table(await viewAllDepartments());
        break;
      case 'Add a department':
        const { departmentName } = await addDepartmentPrompt();
        await addDepartment(departmentName);
        break;
      case 'Add a role':
        const departments = await viewAllDepartments();
        const { roleName, salary, departmentId } = await addRolePrompt(departments);
        await addRole(roleName, salary, departmentId);
        break;
      case 'Add an employee':
        const roles = await viewAllRoles();
        const employees = await viewAllEmployees();
        const { firstName, lastName, roleId, managerId } = await addEmployeePrompt(roles, employees);
        await addEmployee(firstName, lastName, roleId, managerId);
        break;
      case 'Update an employee role':
        const employeesList = await viewAllEmployees();
        const rolesList = await viewAllRoles();
        const { employeeId, newRoleId } = await updateEmployeeRolePrompt(employeesList, rolesList);
        await updateEmployeeRole(employeeId, newRoleId);
        break;
      case 'Exit':
        shouldContinue = false;
        break;
      default:
        console.log('Feature under construction.');
        break;
    }
  }

  process.exit();
}

init();